// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {DataTypes} from "../Libraries/DataTypes.sol";
import {IFIBOVault} from "../Interfaces/IFIBOVault.sol";
import {Events} from "../Libraries/Events.sol";
import {Errors} from "../Libraries/Errors.sol";
import {PriceOracle} from "./PriceOracle.sol";
import {Registry} from "./Registry.sol";

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
<<<<<<< HEAD
    mapping(address => bool) public ScrollAccessibleTokens;
=======
    mapping(address => bool) private ScrollAccessibleTokens;
>>>>>>> 5e7ee18 (<commit_message>)

    constructor(IFIBOVault _FIBOVault) {
        FIBOVault = _FIBOVault;
        registry = new Registry(address(_FIBOVault));
    }

    /**
     * @notice Exchanges a specified amount of one token for another based on their latest price in USD.
     * @dev Retrieves price data from the registry to compute the equivalent amount of the output token.
     * @param _listingId Id of a specific listing
     * @param tokenInSymbol The symbol of the input token to be exchanged.
     * @param tokenOutSymbol The symbol of the output token to receive.
     * @param tokenInAmount The amount of the input token to be exchanged.
     */
<<<<<<< HEAD
    function addScrollTokens(address[] memory tokens) external onlyRole(PROTOCOL_ROLE) {
        for (uint256 i = 0; i < tokens.length; i++) {
            ScrollAccessibleTokens[tokens[i]] = true;
        }
    }

    /**
     * @dev Remove an array of tokens from the list of tokens
     */
    function RemoveScrollTokens(address[] memory tokens) external onlyRole(PROTOCOL_ROLE) {
        for (uint256 i = 0; i < tokens.length; i++) {
            ScrollAccessibleTokens[tokens[i]] = false;
        }
    }

    /**
     * @dev Lists tokens on the market
     * @param _amount The amount of FIBO tokens being listed.
     * @param _desiredTokens The address of the tokens being exchanged
     */
    function listTokens(uint256 _amount, address[] _desiredTokens) public {
        //Todo check if the desiredtokens is inside the ScrollAccessibleTokens
        require(_amount > 0, "Amount to list should be greater than 0");
        require(FIBOVault.balances[msg.sender] >= _amount, "Not enough balance");
        listingIdCounter++;
        listings[listingIdCounter] = DataTypes.TokenListing({
            amount: _amount,
            holder: msg.sender,
            desiredTokens: _desiredTokens,
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
    function removeListing(uint256 listingId) external {
        DataTypes.TokenListing storage listing = listings[listingId];
        require(msg.sender == listing.owner, "Only owner can remove listing");
        require(listing.amount > 0, "Listing does not exist");
        listing[listingId].amount = 0;
        // listing[listingId].holder = delete holder;
        // listing[listingId].desiredTokens = delete desiredTokens;
        listing[listingId].status = DataTypes.ListingStatus.Canceled;
        // listing[listingId] = DataTypes.TokenListing({
        //     amount : 0,
        //     holder : delete holder,
        //     desiredTokens : delete desiredTokens,
        //     status : ListingStatus.Canceled
        // });
        // emit TokensListed(listingCounter, msg.sender, amount, desiredToken[]);
    }

    function BuyFIBO(uint256 _listingId, uint256 _amount, address _desiredTokens) external {
        // we need to add a splippage percentage and remove listingId
        //Todo Implement a data feed
        require(_amount > 0, "Amount to buy should be greater than 0");
        require(listings[_listingId].status == DataTypes.ListingStatus.Pending, "Listing does not exist");
        require(listings[_listingId].desiredTokens == _desiredTokens, "Listing does not exist");
        for (uint256 i = 0; i < listings[_listingId].desiredTokens.length; i++) {
            if (listings[_listingId].desiredTokens[i] == _desiredTokens) {
                require(listings[_listingId].amount >= _amount, "Not enough balance");
                balances[listings[_listingId].holder] -= _amount;
                listings[_listingId].amount -= _amount;
                if (listings[_listingId].amount == 0) {
                    listings[listingIdCounter] = DataTypes.TokenListing({status: DataTypes.ListingStatus.Filled});
                }
            }
            //Todo Emit each timme assets are
        }
    }

    /**
=======
    

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////// Public Functions ///////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /**
>>>>>>> 5e7ee18 (<commit_message>)
     * @dev Mints FIBO tokens for the Euler
     * @param _amount The amount of FIBO tokens being minted
     */
    function mintFIBO4Euler(uint256 _amount) public {
<<<<<<< HEAD
        //Todo Put it inside the market contract
=======
>>>>>>> 5e7ee18 (<commit_message>)
        //Todo  We need to add a timelock restriction so holder can swap their tokens at the beginning of each stage.
        require(_amount > 0, "Amount to burn should be greater than 0");
        Euler.burn(_amount);
        _mint(address(this), _amount);
        balance[msg.sender] += _amount;
    }

    /**
     * @dev Exchanges FIBO tokens for other tokens
     * @param _listingId The Id of the listing
     * @param _amount The amount of FIBO tokens being exchanged
     * @param _desiredTokens The address of the token being exchanged
     */
    function BuyFIBO(uint256 _listingId, uint256 _amount, address _desiredTokens) external {
        // we need to add a slippage percentage and remove listingId
        //Todo Implement a data feed
        require(_amount > 0, "Amount to buy should be greater than 0");
        require(listings[_listingId].status == DataTypes.ListingStatus.Pending, "Listing does not exist");
        require(listings[_listingId].desiredTokens == _desiredTokens, "Listing does not exist");
        for (uint256 i = 0; i < listings[_listingId].desiredTokens.length; i++) {
            if (listings[_listingId].desiredTokens[i] == _desiredTokens) {
                require(listings[_listingId].amount >= _amount, "Not enough balance");
                balances[listings[_listingId].holder] -= _amount;
                listings[_listingId].amount -= _amount;
                if (listings[_listingId].amount == 0) {
                    listings[listingIdCounter] = DataTypes.TokenListing({
                        amount: 0,
                        status: DataTypes.ListingStatus.Filled});
                }
            }
            //Todo Emit each time assets are
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
        emit TokensListed(listingIdCounter, msg.sender, _amount, _desiredTokens[]);
    }

    /**
     * @notice When a Token listing is canceled inside listings, the listing detailed all become zero
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
        listing[listingId] = DataTypes.TokenListing({
            amount : 0,
            status : ListingStatus.Canceled
        });
        emit TokensListed(listingCounter, msg.sender, amount, desiredToken[]);
    }


///////////////////////////////////////////////////////////////// Protocol Role ////////////////////////////////////////////////////////////////

    //Q what is the difference between addPriceFeed and addScrollTokens ?
    /**
     * @notice Adds a new price feed for a given base token.
     * @dev Only callable by accounts with the PROTOCOL_ROLE.
     * @param baseTokenSymbol The symbol of the base token (e.g., ETH, BTC).
     * @param baseTokenAddress The address of the base token contract.
     * @param priceFeedAddress The address of the Chainlink price feed for the base token.
     */
    function addPriceFeed(string memory baseTokenSymbol, address baseTokenAddress, address priceFeedAddress) public override 
    onlyRole(PROTOCOL_ROLE)
    {
        super.addPriceFeed(baseTokenSymbol, baseTokenAddress, priceFeedAddress);
        ScrollAccessibleTokens[baseTokenAddress] = true;
    }

    /**
     * @dev Adds an array of tokens to the list of tokens accessible for users to swap for FIBO
     */
    function addScrollTokens(address[] memory tokens) public onlyRole(PROTOCOL_ROLE) {
        for (uint256 i = 0; i < tokens.length; i++) {
            ScrollAccessibleTokens[tokens[i]] = true;
        }
    }

    /**
     * @dev Remove an array of tokens from the list of tokens
     */
    function RemoveScrollTokens(address[] memory tokens) public onlyRole(PROTOCOL_ROLE) {
        for (uint256 i = 0; i < tokens.length; i++) {
            ScrollAccessibleTokens[tokens[i]] = false;
        }
    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Internal Functions //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    /**
     * @notice Converts the latest price of a token into its value in a base token.
     * @dev Uses the conversion rate of the base token to determine the equivalent value.
     * @param tokenSymbol The symbol of the token to be priced. (e.g., FIBO)
     * @param baseTokenSymbol The symbol of the base token used for conversion. (e.g., SCR)
     * @param baseTokenAmount The amount of the base token.
     * @return The equivalent value of the token in the base token.
     */
    function getLatestPriceOfTokenInBaseToken(
        string memory tokenSymbol,   
        string memory baseTokenSymbol,
        uint256 baseTokenAmount
    ) internal view returns (uint256) {
        return
            (getConversionRate(baseTokenSymbol, baseTokenAmount) * registry.getLatestPriceOfToken(tokenSymbol)) / 1e18;
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
     * @param token The address of the token
     * @return True if the token is accessible, false otherwise
     */
<<<<<<< HEAD
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

    /**
     * @notice Adds a new price feed for a given base token.
     * @dev Only callable by accounts with the PROTOCOL_ROLE.
     * @param baseTokenSymbol The symbol of the base token (e.g., ETH, BTC).
     * @param baseTokenAddress The address of the base token contract.
     * @param priceFeedAddress The address of the Chainlink price feed for the base token.
     */
    function addPriceFeed(string memory baseTokenSymbol, address baseTokenAddress, address priceFeedAddress)
        public
        override
        onlyRole(PROTOCOL_ROLE)
    {
        super.addPriceFeed(baseTokenSymbol, baseTokenAddress, priceFeedAddress);
        ScrollAccessibleTokens[baseTokenAddress] = true;
    }

    /**
     * @notice Converts the latest price of a token into its value in a base token.
     * @dev Uses the conversion rate of the base token to determine the equivalent value.
     * @param tokenSymbol The symbol of the token to be priced. (e.g., FIBO)
     * @param baseTokenSymbol The symbol of the base token used for conversion. (e.g., SCR)
     * @param baseTokenAmount The amount of the base token.
     * @return The equivalent value of the token in the base token.
     */
    function getLatestPriceOfTokenInBaseToken(
        string memory tokenSymbol,
        string memory baseTokenSymbol,
        uint256 baseTokenAmount
    ) internal view returns (uint256) {
        return
            (getConversionRate(baseTokenSymbol, baseTokenAmount) * registry.getLatestPriceOfToken(tokenSymbol)) / 1e18;
    }

    /**
     * @notice Exchanges a specified amount of one token for another based on their latest price in USD.
     * @dev Retrieves price data from the registry to compute the equivalent amount of the output token.
     * @param _listingId Id of a specific listing
     * @param tokenInSymbol The symbol of the input token to be exchanged.
     * @param tokenOutSymbol The symbol of the output token to receive.
     * @param tokenInAmount The amount of the input token to be exchanged.
     */
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

    //Todo Later on after we finish implementing all the above, We need to loop
    // all of the next addresses that have the desiredtokens in case the user wants
    // more FIBO tokens and we need to filter them by listingtoken time.
    // The early bird gets the worm so we will apply a FIFO system

    //Todo We need to create a priority system using a FIFO (First in First out) approach
    //Todo we also need to implement a way that if a user wants more tokens, it will iterate
    //     to the next available seller.
}

=======
    function checkScrollTokens(address token) public view returns (bool) {
        return ScrollAccessibleTokens[token];
    }

}


>>>>>>> 5e7ee18 (<commit_message>)
////////////////////////////////////////////////////////// Comments //////////////////////////////////////////////////////////

// When a new buyer buys FIBO tokens they should wait a minimum amount before listing his tokens
// this will eliminate an MEV opportunities for quick money.
//N we need to implement this inside the listtokens function

<<<<<<< HEAD
/**
 * Section 2
 * We will need to create a priority system using a FIFO (First in First out) approach
 * example :
 * Bob has listed 1000 tokens on 1 January.
 * Alice has listed 2000 tokens on 5 January.
 * Tony has listed 500 tokens on 9 January.
 *
 * When a buyer wants to buy FIBO tokens in exchange for $SCR :
 *      He will use the filter on the dashboard to see which FIBO tokens are available for sale in exchange for $SCR.
 *      We will display all the Holders who are interested in getting $SCR for their FIBO tokens.
 *      If Noir wants to buy 800 tokens, he will buy it from Bob. Since bob was the first to list,
 *      he will be the first to sell. But if the buyer wants 1500 tokens, he will buy the first 1000 tokens from Bob and rest from Alice.
 *      Alice will have 1500 tokens left that she can sell.
 */
=======
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
>>>>>>> 5e7ee18 (<commit_message>)
