// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {DataTypes} from "../Libraries/DataTypes.sol";
import {Events} from "../Libraries/Events.sol";
import {Errors} from "../Libraries/Errors.sol";
import {Constants} from "../Libraries/Constants.sol";
import {PriceOracle} from "./PriceOracle.sol";
import {Registry} from "./Registry.sol";
import {IFIBOVault} from "../Interfaces/IFIBOVault.sol";

contract Market is ERC20, PriceOracle {
    Registry public registry;
    IFIBOVault public FIBOVault;
    uint256 public listingIdCounter;

    /**
     * @notice Tracks token listings
     * @dev Return a struct with token address and amount
     */
    mapping(uint256 => DataTypes.TokenListing[]) public listings;

    /**
     * @dev Tokens accessible for users to swap for FIBO
     */
    mapping(address => bool) public ScrollAccessibleTokens;

    mapping(address user => uint256 totalListedAmount) public userToTotalListedAmount;

    constructor(IFIBOVault _FIBOVault) {
        FIBOVault = _FIBOVault;
        registry = new Registry(address(_FIBOVault));
    }

    /**
     * @dev Adds an array of tokens to the list of tokens accessible for users to swap for FIBO
     */
    function addScrollTokens(address[] memory tokens, address[] memory priceFeeds) external onlyRole(PROTOCOL_ROLE) {
        require(tokens.length == priceFeeds.length, "Length mismatch");
        for (uint256 i = 0; i < tokens.length; i++) {
            ScrollAccessibleTokens[tokens[i]] = true;
            addPriceFeed(tokens[i], priceFeeds[i]);
        }
    }

    /**
     * @dev Remove an array of tokens from the list of tokens
     */
    function RemoveScrollTokens(address[] memory tokens) external onlyRole(PROTOCOL_ROLE) {
        for (uint256 i = 0; i < tokens.length; i++) {
            ScrollAccessibleTokens[tokens[i]] = false;
            removePriceFeed(tokens[i]);
        }
    }

    /**
     * @dev Lists tokens on the market
     * @param _amount The amount of FIBO tokens being listed.
     * @param _desiredTokens The address of the tokens being exchanged
     */
    function listTokens(uint256 _amount, address[] _desiredTokens) public {
        require(_amount > 0, "Amount to list should be greater than 0");
        require(FIBOVault.balances[msg.sender] >= _amount, "Not enough balance");
        // we need to check if the amount of tokens that are already being listed
        // 1000 tokens -> 1000 tokens + 1000
        for (uint256 i = 0; i < _desiredTokens.length; i++) {
            require(ScrollAccessibleTokens[_desiredTokens[i]], "Token not supported");
        }
        listingIdCounter++;
        listings[listingIdCounter] = DataTypes.TokenListing({
            amount: _amount,
            holder: msg.sender,
            desiredTokens: _desiredTokens,
            status: DataTypes.ListingStatus.Pending
        });
        //address -> uint256 the total listed amount
        userToTotalListedAmount[msg.sender] += _amount;
        emit TokensListed(listingIdCounter, msg.sender, _amount, _desiredTokens[]);
    }

    /**
     * @notice When a Token listing is canceled inside listings,
     *         the listing detailed all become zero
     * @dev Remove a token from listings
     * @param listingId The Id of the listing
     */
    function removeListing(uint256 listingId) external {
        DataTypes.TokenListing storage listing = listings[listingId];
        require(msg.sender == listing.owner, "Only owner can remove listing");
        require(listing.amount > 0, "Listing does not exist");
        // we need to update the listingtokens mapping to remove the tokens from it.
        // he still has from 1000 -> 150 tokens
        // totallistedbalance = totallistedbalance - 150
        listing[listingId] = DataTypes.TokenListing({amount: 0, status: ListingStatus.Canceled});
        userToTotalListedAmount[msg.sender] -= listing.amount;
        emit TokensListed(listingCounter, msg.sender, amount, desiredToken[]);
    }

    /**
     * @notice Converts the latest price of FIBO token into its value in the desired token.
     * @dev Uses the conversion rate of the desired token to determine the equivalent value.
     * @param desiredTokenAddress The address of the desired ERC20 token used for conversion. (e.g., SCR)
     * @return The equivalent value of the token in 1 desired token.
     */
    function getLatestPriceOfFIBOTokenInDesiredToken(address desiredTokenAddress) internal view returns (uint256) {
        return (getConversionRate(desiredTokenAddress, Constants.ONE_ETHER) * registry.getLatestPriceOfToken())
            / Constants.DECIMAL_SCALING_FACTOR;
    }

    function BuyFIBO(uint256 _listingId, uint256 _amount, address _desiredToken, uint256 _slippagePercentage)
        external
    {
        // we need to add a slippage percentage and remove listingId
        //Todo Implement a data feed
        require(_amount > 0, "Amount to buy should be greater than 0");
        require(listings[_listingId].status == DataTypes.ListingStatus.Pending, "Listing does not exist");
        require(ScrollAccessibleTokens[_desiredToken], "Token not supported by the protocol");
        bool tokenSupportedByListing;
        for (uint256 i = 0; i < listings[_listingId].desiredTokens.length; i++) {
            if (listings[_listingId].desiredTokens[i] == _desiredToken) {
                require(listings[_listingId].amount >= _amount, "Not enough balance");
                balances[listings[_listingId].holder] -= _amount;
                listings[_listingId].amount -= _amount;
                if (listings[_listingId].amount == 0) {
                    listings[listingIdCounter] = DataTypes.TokenListing({status: DataTypes.ListingStatus.Filled});
                }

                tokenSupportedByListing = true;
            }
            //Todo Emit each timme assets are
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
     * @dev Mints FIBO tokens for the Euler
     * @param _amount The amount of FIBO tokens being minted
     */
    function mintFIBO4Euler(uint256 _amount) public {
        //Todo Put it inside the market contract
        //Todo  We need to add a timelock restriction so holder can swap their tokens at the beginning of each stage.
        require(_amount > 0, "Amount to burn should be greater than 0");
        Euler.burn(_amount);
        _mint(address(this), _amount);
        balance[msg.sender] += _amount;
    }

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
        return ScrollAccessibleTokens[token];
    }

    //Todo call the data feed: uint256 tokenprice = data.feed();...
    //Todo call the registry to check the price of FIBO
    // Do necessary calcualtions to have a z:1 ratio 500$ (200 FIBO) = 500$ (1000 SCR)

    // sum = tokenPrice * _amount; //Sum of FIBO Tokens ex: 500$
    // numberOfTokenExchanged = sum / tokenDataFeed;
    // IERC20(_desiredTokens).transfer(listings[_listingId].holder, numberOfTokenExchanged);
    // balances[msg.sender] += numberOfTokenExchanged;

    //Todo Later on after we finish implementing all the above, We need to loop
    // all of the next addresses that have the desiredtokens in case the user wants
    // more FIBO tokens and we need to filter them by listingtoken time.
    // The early bird gets the worm so we will apply a FIFO system

    //Todo We need to create a priority system using a FIFO (First in First out) approach
    //Todo we also need to implement a way that if a user wants more tokens, it will iterate
    //     to the next available seller.
}

////////////////////////////////////////////////////////// Comments //////////////////////////////////////////////////////////

// When a new buyer buys FIBO tokens they should wait a minimum amount before listing his tokens
// this will eliminate an MEV opportunities for quick money.
//N we need to implement this inside the listtokens function

/*
function exchangeToken(
        uint256 _listingId, // q should we calculate the _listingId on the basis of FIFO instead?
        string memory tokenInSymbol,
        string memory tokenOutSymbol,
        uint256 tokenInAmount
    ) public {
        address tokenOutAddress = getBaseTokenAddress(tokenOutSymbol);

        require(keccak256(bytes(tokenInSymbol)) == keccak256(bytes("FIBO")), "Token not supported");
        require(ScrollAccessibleTokens[tokenOutAddress], "Token not supported");
        require(FIBOVault.balances[msg.sender] >= tokenInAmount, "Not enough balance");

        uint256 tokenInPrice = getLatestPriceOfTokenInBaseToken(tokenInSymbol, baseTokenSymbol, tokenInAmount); // Price of FIBO in USD
        uint256 tokenOutPrice = registry.getLatestPriceOfToken(tokenOutSymbol); // Price of SCR in USD

        uint256 tokenOutAmount = (tokenInPrice * 1e18) / tokenOutPrice; // Amount of tokenOutSymbol (SCR) tokens received for tokenInAmount (amount of FIBO) of tokenInSymbol (FIBO)

        require(balances[listings[_listingId].holder] >= tokenOutAmount, "Not enough balance");

        balances[listings[_listingId].holder] -= tokenOutAmount;
        balances[msg.sender] += tokenOutAmount;

        // TODO: Implement logic to decrement the balance of tokenInSymbol (i.e., FIBO token)
        // FIBOVault.balances[msg.sender] -= tokenOutAmount; // Not possible to change the value of a variable of another contract

        IERC20(tokenOutAddress).transfer(listings[_listingId].holder, tokenOutAmount);
    }
    */
