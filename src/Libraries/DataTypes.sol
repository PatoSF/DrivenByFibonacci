// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

/**
* @notice Add all the structs and enums here
*/

library DataTypes {

    struct Stage {
        uint256 TotalSubstages;  // Total number of substages
        uint256 SubstageDuration;    // Duration in seconds
        uint256 TotalPriceIncrease;  // Total price increase
        uint256 TotalSupplyIncrease;  // Total supply increase
    }

    struct Substage {
        uint SubstageNumber;
        uint256 PriceIncrease;  // Price increase per substage
        uint256 SupplyIncrease;  // Supply increase per substage
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
}