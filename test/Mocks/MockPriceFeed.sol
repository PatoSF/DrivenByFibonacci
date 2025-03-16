// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract MockPriceFeed is AggregatorV3Interface {
    int256 private price;

    constructor(int256 _initialPrice) {
        price = _initialPrice;
    }

    function latestRoundData() external view override returns (uint80, int256 answer, uint256, uint256, uint80) {
        return (0, price, 0, 0, 0);
    }

    // Added implementation to satisfy the interface requirements.
    function getRoundData(uint80 /* _roundId */ )
        external
        view
        override
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)
    {
        return (0, price, 0, 0, 0);
    }

    function setPrice(int256 _newPrice) external {
        price = _newPrice;
    }

    function decimals() external pure override returns (uint8) {
        return 8;
    }

    function description() external pure override returns (string memory) {
        return "Mock Price Feed";
    }

    function version() external pure override returns (uint256) {
        return 1;
    }
}