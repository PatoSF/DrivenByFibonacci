// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {PriceFeedRegistry} from "./PriceFeedRegistry.sol";

library PriceConverter {
    using PriceFeedRegistry for string;

    function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256) {
        (, int256 answer,,,) = priceFeed.latestRoundData(); // by default, the priceFeed returns in 8 decimals
        return uint256(answer * 10000000000); // in 18 decimals
    }

    // 1000000000
    function getConversionRate(string memory baseTokenSymbol, uint256 baseTokenAmount)
        internal
        view
        returns (uint256)
    {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(baseTokenSymbol.getPriceFeedAddress());
        uint256 basePrice = getPrice(priceFeed);
        // quoteTokenAmount is same as baseTokenAmount in this case
        uint256 quoteTokenAmount = (basePrice * baseTokenAmount) / 1000000000000000000;
        // the actual Base/Quote conversion rate, after adjusting the extra 0s.
        return quoteTokenAmount;
    }
}
