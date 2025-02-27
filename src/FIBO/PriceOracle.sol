// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

contract PriceOracle {
    mapping(string baseTokenSymbol => address priceFeedAddress) private baseTokenSymbolToPriceFeedAddress;

    function addPriceFeedAddress(string memory baseTokenSymbol, address priceFeedAddress) internal {
        baseTokenSymbolToPriceFeedAddress[baseTokenSymbol] = priceFeedAddress;
    }

    function getPriceFeedAddress(string memory baseTokenSymbol) public view returns (address) {
        return baseTokenSymbolToPriceFeedAddress[baseTokenSymbol];
    }

    /**
     * @notice Fetches the latest price of a token from a Chainlink price feed.
     * @dev Converts the 8-decimal returned price to an 18-decimal format.
     * @param priceFeed The Chainlink AggregatorV3Interface price feed contract.
     * @return The latest token price scaled to 18 decimals.
     */
    function getPrice(AggregatorV3Interface priceFeed) internal view returns (uint256) {
        (, int256 answer,,,) = priceFeed.latestRoundData(); // Chainlink price feeds return prices with 8 decimals
        return uint256(answer * 1e10); // Convert to 18 decimals
    }

    /**
     * @notice Computes the conversion rate of a given base token amount to its equivalent quote token amount.
     * @dev Fetches the price feed for the base token and calculates the converted amount.
     * @param baseTokenSymbol The symbol of the base token (e.g., "ETH", "BTC", "USDC").
     * @param baseTokenAmount The amount of the base token to convert.
     * @return The equivalent amount in the quote token.
     */
    function getConversionRate(string memory baseTokenSymbol, uint256 baseTokenAmount) public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(getPriceFeedAddress(baseTokenSymbol));
        uint256 basePrice = getPrice(priceFeed);
        // Compute the equivalent quote token amount
        uint256 quoteTokenAmount = (basePrice * baseTokenAmount) / 1e18;
        return quoteTokenAmount;
    }
}
