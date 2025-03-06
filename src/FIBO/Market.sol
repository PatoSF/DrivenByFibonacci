// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {Constants} from "../Libraries/Constants.sol";
import {DataTypes} from "../Libraries/DataTypes.sol";
import {Events} from "../Libraries/Events.sol";
import {Errors} from "../Libraries/Errors.sol";
// import {IFIBOVault} from "../Interfaces/IFIBOVault.sol";
import {FiboVault} from "./FIBOVault.sol";
// interface IFIBOVault {
//     function updateBalance(address _currentHolder, address _newHolder, uint256 _amount) public returns (uint256);
// }

contract Market {
    FiboVault public FIBOVault;
    //IFIBOVault public FIBOVault;
    uint256 public listingIdCounter;


    mapping (address => uint256[]) public userListings;

    /**
     * @notice Tracks token listings
     * @dev Return a listing information
     */
    mapping (uint256 => DataTypes.TokenListing) public listings;

    /**
     * @dev Tokens accessible for users to swap for FIBO
     */
   //mapping(address => bool) private ScrollAccessibleTokens;
    mapping(address => DataTypes.BaseToken) private ScrollAccessibleTokens;

    constructor(address _FIBOVault) {
        FIBOVault = FiboVault(_FIBOVault);
    }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// Public Functions ///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @dev Exchanges FIBO tokens for other tokens
     * @param _listingId The Id of the listing
     * @param _amount The amount of FIBO tokens being exchanged
     * @param _desiredTokens The address of the token being exchanged
     */
    function BuyFIBO(address holder, uint256 _listingId, uint256 _amount, uint256 _exchangedAmount ,address _desiredTokens, uint256 _slippage) public {
        require(_amount > 0, "Amount to buy should be greater than 0");
        require(listings[userListings[holder][_listingId]].status == DataTypes.ListingStatus.Pending, "Listing does not exist");
        require(listings[userListings[holder][_listingId]].amount != 0, "Can't buy filled listing");
        require(listings[userListings[holder][_listingId]].holder == holder, "Not owner of ListingId");



        for (uint256 i = 0; i < listings[userListings[holder][_listingId]].desiredToken.length; i++) {

            if (listings[userListings[holder][_listingId]].desiredToken[i] == _desiredTokens) {
                require(listings[userListings[holder][_listingId]].amount >= _amount, "Not enough balance");
                listings[_listingId].amount -= _amount;
                FIBOVault.updateBalance(listings[_listingId].holder, msg.sender, _amount);
                uint256 receivedAmount = (getLatestPriceOfTokenInBaseToken(_exchangedAmount) * 1e18) / getConversionRate(_desiredTokens);
                uint256 maxAmount = (_exchangedAmount * _slippage) / 100 + _exchangedAmount;
                uint256 maxreceivedAmount = (getLatestPriceOfTokenInBaseToken(maxAmount) * 1e18) / getConversionRate(_desiredTokens);
                require(maxreceivedAmount >= receivedAmount, "Received amount exceeded slippage");
                IERC20(_desiredTokens).transfer(holder, receivedAmount);


                uint256 listingAmount = listings[userListings[holder][_listingId]].amount;
                if (listingAmount - _amount == 0) {
                    listings[listingIdCounter].status = DataTypes.ListingStatus.Filled;
                }
                else {
                    listings[listingIdCounter].amount -= _amount;
                    listings[listingIdCounter].status = DataTypes.ListingStatus.Pending;
                } 
                emit Events.TokensBought(_listingId, msg.sender, receivedAmount, _desiredTokens);  
                break;
            }
        }
    }

    /**
     * @dev Lists tokens on the market
     * @param _amount The amount of FIBO tokens being listed.
     * @param _desiredTokens The address of the tokens being exchanged
     */
    function listTokens(uint256 _amount, address[] memory _desiredTokens) public {
        require(_amount > 0, "Amount to list should be greater than 0");
        require(FIBOVault.balanceOf(msg.sender) >= _amount, "Not enough balance");
        /** @dev Checks if the amount of tokens that will be listed is smaller than 
                 the amount of tokens that are already being listed in respect to the user's balance*/
        uint256 listedBalance;
        for (uint256 i = 0; i < userListings[msg.sender].length; i++) {
            listedBalance += listings[userListings[msg.sender][i]].amount;
        }
        uint256 availableTokens = FIBOVault.balanceOf(msg.sender) - listedBalance;
        require(_amount <= availableTokens, "Max tokens listed");
        /** @dev Checks if the token is supported by EulerFi */
        for (uint256 i = 0; i < _desiredTokens.length; i++) {
            require(ScrollAccessibleTokens[_desiredTokens[i]].listed, "Token not supported");
        }
        listingIdCounter++;
        userListings[msg.sender].push(listingIdCounter);
        listings[userListings[msg.sender][listingIdCounter]] = DataTypes.TokenListing({
            amount: _amount,
            holder: msg.sender,
            desiredToken: _desiredTokens,
            status: DataTypes.ListingStatus.Pending
        });
        emit Events.TokensListed(listingIdCounter, msg.sender, _amount, _desiredTokens);
    }

    /**
     * @notice When a Token listing is canceled inside listings,
     *         the listing detailed all become zero
     * @dev Remove a token from listings
     * @param listingId The Id of the listing
     */
    function removeListing(uint256 listingId) public {
        DataTypes.TokenListing memory listing = listings[userListings[msg.sender][listingId]];
        require(listing.holder == msg.sender, "Not Owner of ListingId");
        require(listing.amount > 0, "Listing does not exist");
        listing = DataTypes.TokenListing({
            amount : 0,
            holder : msg.sender,
            desiredToken : listing.desiredToken,
            status : DataTypes.ListingStatus.Canceled
            
        }); 
        emit Events.TokensListed(listingId, msg.sender, listing.amount, listing.desiredToken);
    }


///////////////////////////////////////////////////////////////// Protocol Role ////////////////////////////////////////////////////////////////

    /**
     * @dev Adds an array of tokens to the list of tokens accessible for users to swap for FIBO
     * @param tokens An array of token addresses accepted by the market
     */
    function addScrollTokens(address[] memory tokens, address[] memory priceFeeds) public {
        require(tokens.length == priceFeeds.length, "Length mismatch");
        //Todo Add access control | onlyRole(PROTOCOL_ROLE)
        for (uint256 i = 0; i < tokens.length; i++) {
            ScrollAccessibleTokens[tokens[i]] = DataTypes.BaseToken({
                listed: true,
                priceFeedAddress: priceFeeds[i]
            });
        }
        require(tokenSupportedByListing, "Token not supported by the listing");

        uint256 amountOfDesiredTokensToBuyFIBO =
            (_amount * getLatestPriceOfTokenInBaseToken(_desiredToken)) / Constants.DECIMAL_SCALING_FACTOR;

        uint256 maxAmountOfDesiredTokensToTransfer =
            (amountOfDesiredTokensToBuyFIBO * (100 + _slippagePercentage)) / 100;

        // Ensure the user has approved enough tokens
        require(
            IERC20(_desiredToken).allowance(msg.sender, address(this)) >= maxAmountOfDesiredTokensToTransfer,
            "Insufficient allowance, approve more tokens"
        );

        // TODO: Implement logic to increment the balance of tokenInSymbol (i.e., FIBO token)
        // FIBOVault.balances[msg.sender] += _amount; // Not possible to change the value of a variable of another contract

        // Transferring the slippage-adjusted amount of desiredTokens to the FIBO token lister from which the user is buying
        IERC20(_desiredToken).transferFrom(msg.sender, listings[_listingId].holder, maxAmountOfDesiredTokensToTransfer);
    }

    /**
     * @dev Remove an array of tokens from the list of tokens
     * @param tokens An array of token addresses removed from the market
     */
    function RemoveScrollTokens(address[] memory tokens) public {
        //Todo Add access control | onlyRole(PROTOCOL_ROLE)
        for (uint256 i = 0; i < tokens.length; i++) {
            ScrollAccessibleTokens[tokens[i]] = DataTypes.BaseToken({
                listed: false,
                priceFeedAddress: address(0)
            });
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Internal Functions //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   
    /**
     * @notice Fetches the latest price of a token from a Chainlink price feed.
     * @dev Converts the 8-decimal returned price to an 18-decimal format.
     * @param priceFeed The Chainlink AggregatorV3Interface price feed contract.
     * @return The latest token price scaled to 18 decimals.
     */
    function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256) {
        (, int256 answer,,,) = priceFeed.latestRoundData(); // Chainlink price feeds return prices with 8 decimals
        return uint256(answer * 1e10); // Convert to 18 decimals
    }

    /**
     * @notice Computes the conversion rate of a given base token amount to its equivalent quote token amount.
     * @dev Fetches the price feed for the base token and calculates the converted amount.
     * @param baseTokenAddress The address of the base token (e.g., "ETH", "BTC", "USDC").
     * @return The equivalent amount in the quote token.
     */
    function getConversionRate(address baseTokenAddress) internal view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(getPriceFeedAddress(baseTokenAddress));
        uint256 baseTokenPrice = getPrice(priceFeed);
        return baseTokenPrice;

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////// View Funtions /////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
     * @dev Returns information about one listing
     * @param _listingId Id of a specific listingS
     * @return Returns a struct containing the holder, the amount and the desired tokens
     */
    function getListing(uint256 _listingId) public view returns (DataTypes.TokenListing memory) {
        return listings[_listingId];
    }

    /**
     * @dev Checks if a token is accessible for users to swap for FIBO
     */
    function checkScrollTokens(address token) external view returns (bool) {
        return ScrollAccessibleTokens[token].listed;
    }

    /**
     * @notice Retrieves the Chainlink price feed address for a given base token.
     * @param baseTokenAddress The address of the base token contract.
     * @return The address of the Chainlink price feed contract.
     */
    function getPriceFeedAddress(address baseTokenAddress) public view returns (address) {
        return ScrollAccessibleTokens[baseTokenAddress].priceFeedAddress;
    }

    /**
     * @dev Retrieves the total value of an amount of FIBO tokens at a current substage
     * @param tokenInAmount Amount of FIBO tokens
     * @return The total value of the FIBO tokens
     */   
    function getLatestPriceOfTokenInBaseToken(uint256 tokenInAmount) public view returns (uint256) {
        uint256 stage = FIBOVault.getStage();
        uint256 substage = FIBOVault.getSubstage();
        uint256 latestAmount = tokenInAmount * FIBOVault.getSubstagePrice(stage, substage);
        return latestAmount;
    }

}
