// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

/**
* @notice Add all the events here
*/

library Events {

    event TokensListed(
        uint256 indexed listingId,
        address indexed owner,
        address indexed token,
        uint256 amount,
        address desiredToken
    );

    event ListingRemoved(
        uint256 indexed listingId,
        address indexed owner
    );


}


