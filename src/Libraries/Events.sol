// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

/**
* @notice Add all the events here
*/

library Events {

    event TokensListed(
        uint256 indexed listingId,
        address indexed owner,
        uint256 amount,
        address[] desiredToken
    );

    event ListingRemoved(
        uint256 indexed listingId,
        address indexed owner
    );

    event TokensBought(
        uint256 indexed listingId,
        address indexed buyer,
        uint256 receivedamount,
        address desiredToken
    );

    event StageInitialized(
        uint256 _stage, 
        uint256 _maxsubstage, 
        uint256 _newprice, 
        uint256 _newsupply
        );

}

