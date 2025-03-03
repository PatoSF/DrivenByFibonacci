// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";
import {Constants} from "../Libraries/Constants.sol";
/**
 * @title PriceOracle
 * @notice Contract for fetching token prices using Chainlink price feeds.
 * @dev Stores base token addresses and their respective Chainlink price feed addresses.
 */

contract PriceOracle {
    /// @notice Mapping of base token addresses to their respective Chainlink price feed addresses.
    mapping(address baseTokenAddress => address priceFeedAddress) private baseTokens;

    /**
     * @notice Adds a new price feed for a base token.
     * @dev Stores the token address and its associated Chainlink price feed.
     * @param baseTokenAddress The address of the base token contract.
     * @param priceFeedAddress The address of the Chainlink price feed contract for the token.
     */
    function addPriceFeed(address baseTokenAddress, address priceFeedAddress) internal {
        baseTokens[baseTokenAddress] = priceFeedAddress;
    }

    /**
     * @notice Removes a price feed for a base token.
     * @dev Removes the Chainlink price feed address associated with a particular base token.
     * @param baseTokenAddress The address of the base token contract.
     */
    function removePriceFeed(address baseTokenAddress) internal {
        baseTokens[baseTokenAddress] = Constants.ZERO_ADDRESS;
    }

    /**
     * @notice Retrieves the Chainlink price feed address for a given base token.
     * @param baseTokenAddress The address of the base token contract.
     * @return The address of the Chainlink price feed contract.
     */
    function getPriceFeedAddress(address baseTokenAddress) public view returns (address) {
        return baseTokens[baseTokenAddress];
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
     * @param baseTokenAddress The address of the base token contract.
     * @param baseTokenAmount The amount of the base token to convert.
     * @return The equivalent amount in the quote token.
     */
    function getConversionRate(address baseTokenAddress, uint256 baseTokenAmount) public view returns (uint256) {
        AggregatorV3Interface priceFeed = AggregatorV3Interface(getPriceFeedAddress(baseTokenAddress));
        uint256 baseTokenPrice = getPrice(priceFeed);
        // Compute the equivalent quote token amount
        uint256 quoteTokenAmount = (baseTokenPrice * baseTokenAmount) / Constants.DECIMAL_SCALING_FACTOR;
        return quoteTokenAmount;
    }
}
