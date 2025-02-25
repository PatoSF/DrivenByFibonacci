// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {DataTypes} from "../Libraries/DataTypes.sol";
import {FIBOVault} from "../Interfaces/IFIBOVault.sol";
import {Events} from "../Libraries/Events.sol";
import {Errors} from "../Libraries/Errors.sol";

contract Market is ERC20 {
    IFIBOVault public FIBOVault;
    uint256 public listingIdCounter; 

    /**
    * @notice Tracks token listings
    * @dev Return a struct with token address and amount
    */
    mapping(uint256 => DataTypes.TokenListing[]) public listings;
    mapping (address => bool) public ScrollAccessibleTokens; //Tokens accessible for users to swap for FIBO
    constructor(IFIBOVault _FIBOVault) { 
        FIBOVault = _FIBOVault;
    }

    /**
     * @dev Adds an array of tokens to the list of tokens accessible for users to swap for FIBO
     */
    function addScrollTokens (address[] memory tokens) external onlyRole(PROTOCOL_ROLE) {
        for (uint256 i = 0; i < tokens.length; i++) {
            ScrollAccessibleTokens[tokens[i]] = true;
        }
    }

    /**
     * @dev Remove an array of tokens from the list of tokens 
     */
    function addScrollTokens (address[] memory tokens) external onlyRole(PROTOCOL_ROLE) {
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
        require(_amount > 0, "Amount to list should be greater than 0");
        require(FIBOVault.balances[msg.sender] >= _amount, "Not enough balance");
        listingIdCounter++;
        listings[listingIdCounter] = DataTypes.TokenListing({
            amount : _amount,
            holder : msg.sender,
            desiredTokens : _desiredToken,
            status : ListingStatus.Pending
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

    function BuyFIBO (uint256 _listingId, uint256 _amount, address _desiredTokens) external {
        //Todo Implement a data feed 
        require(_amount > 0, "Amount to buy should be greater than 0");
        require(listings[_listingId].status == ListingStatus.Pending, "Listing does not exist");
        require(listings[_listingId].desiredTokens == _desiredTokens,
         "Listing does not exist");
        for (uint256 i = 0; i < listings[_listingId].desiredTokens.length; i++) {
            if (listings[_listingId].desiredTokens[i] == _desiredTokens){

                require(listings[_listingId].amount >= _amount, "Not enough balance");
                balances[listings[_listingId].holder] -= _amount;
                listings[_listingId].amount -= _amount;
                if (balances[listing[_listingId].holder] == 0) {
                    listings[listingIdCounter] = DataTypes.TokenListing({
                    status : ListingStatus.Filled
                    });
                }
            }
        }

        //Todo call the data feed: uint256 tokenprice = data.feed();...
        //Todo call the registry to check the price of FIBO 
        // Do necessary calcualtions to have a 1:1 ratio 500$ (200 FIBO) = 500$ (1000 SCR)

        // sum = tokenPrice * _amount; //Sum of FIBO Tokens ex: 500$ 
        // numberOfTokenExchanged = sum / tokenDataFeed;
        // IERC20(_desiredTokens).transfer(listings[_listingId].holder, numberOfTokenExchanged);
        // balances[msg.sender] += numberOfTokenExchanged;

        //Todo Later on after we finish implementing all the above, We need to loop
        // all of the next addresses that have the desiredtokens in case the user wants
        // more FIBO tokens and we need to filter them by listingtoken time.
        // The early bird gets the worm so we will apply a FIFO system
    }

}