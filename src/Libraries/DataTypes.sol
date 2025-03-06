// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

/**
* @notice Add all the structs and enums here
*/

library DataTypes {
    
    struct Stage {
        // Total Price Increase
        uint256 price;
        // Total Supply before minting
        uint256 artificialSupply;
        // Max Substages per Stage
        uint256 maxSubstage;
        // Substage Duration
        uint256 substageDuration;
    }

    struct Substage {
        // Stage Number
        uint256 stageId; 
        // New Total Supply at the current Substage
        uint256 newSubstageSupply;
        // Substage Token Increase
        uint256 substageTokenIncrease;
        // Substage Price Increase
        uint256 substagePrice;
        // New Price after each substage
        uint256 newPrice;
    }
    struct PreviousInfo {
        // Previous Stage
        uint256 previousStage;
        // Previous Price
        uint256 previousPrice;
        // Previous Total Supply
        uint256 previousTotalSupply;
    }

    struct TokenListing {
        //uint256 listingId; 
        uint256 amount;
        address holder;
        address[] desiredToken; // The token user wants in exchange
        ListingStatus status; // Pending, Filled, Canceled
    }

    enum ListingStatus {
        Pending,
        Filled,
        Canceled
    }

    struct BaseToken {
        bool listed;
        address priceFeedAddress;
    }
}