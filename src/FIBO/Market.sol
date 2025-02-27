// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {DataTypes} from "../Libraries/DataTypes.sol";
import {FIBOVault} from "../Interfaces/IFIBOVault.sol";
import {Events} from "../Libraries/Events.sol";
import {Errors} from "../Libraries/Errors.sol";
import {PriceOracle} from "./Market.sol";

contract Market is ERC20, PriceOracle {
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

    constructor(IFIBOVault _FIBOVault) {
        FIBOVault = _FIBOVault;
    }

    /**
     * @dev Adds an array of tokens to the list of tokens accessible for users to swap for FIBO
     */
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
            desiredTokens: _desiredToken,
            status: ListingStatus.Pending
        });
        emit TokensListed(listingCounter, msg.sender, amount, desiredToken[]);
    }

    /**
     * @notice When a Token listing is canceled inside listings,
     *         the listing detailed all become zero
     * @dev Remove a token from listings
     * @param listingId The Id of the listing
     */
    function removeListing(uint256 listingId) external {
        TokenListing storage listing = listings[listingId];
        require(msg.sender == listing.owner, "Only owner can remove listing");
        require(listing.amount > 0, "Listing does not exist");
        listing[listingId].amount = 0;
        listing[listingId].holder = delete holder;
        listing[listingId].desiredTokens = delete desiredTokens;
        listing[listingId].status = ListingStatus.Canceled;
        // listing[listingId] = DataTypes.TokenListing({
        //     amount : 0,
        //     holder : delete holder,
        //     desiredTokens : delete desiredTokens,
        //     status : ListingStatus.Canceled
        // });
        emit TokensListed(listingCounter, msg.sender, amount, desiredToken[]);
    }

    function BuyFIBO(uint256 _listingId, uint256 _amount, address _desiredTokens) external {
        // we need to add a splippage percentage and remove listingId
        //Todo Implement a data feed
        require(_amount > 0, "Amount to buy should be greater than 0");
        require(listings[_listingId].status == ListingStatus.Pending, "Listing does not exist");
        require(listings[_listingId].desiredTokens == _desiredTokens, "Listing does not exist");
        for (uint256 i = 0; i < listings[_listingId].desiredTokens.length; i++) {
            if (listings[_listingId].desiredTokens[i] == _desiredTokens) {
                require(listings[_listingId].amount >= _amount, "Not enough balance");
                balances[listings[_listingId].holder] -= _amount;
                listings[_listingId].amount -= _amount;
                if (listings[_listingId].amount == 0) {
                    listings[listingIdCounter] = DataTypes.TokenListing({status: ListingStatus.Filled});
                }
            }
            //Todo Emit each timme assets are
        }
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
