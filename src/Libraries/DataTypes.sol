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
        //uint256 listingId; //N I had to comment the listingId because I need to put the correct require statement in updatebalance
        uint256 amount;
        address holder;
        address[] desiredToken; // The token user wants in exchange
        ListingStatus status;
        // N we should record at which stage and substage the holder decided to list.
        // N In the Market contract we will do the same thing, we will record when his tokens were sold.
    }

    enum ListingStatus {
        Pending,
        Filled,
        Canceled
    }
}