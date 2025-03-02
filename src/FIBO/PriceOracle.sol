// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/shared/interfaces/AggregatorV3Interface.sol";

/**
 * @title PriceOracle
 * @notice Abstract contract for fetching token prices using Chainlink price feeds.
 * @dev Stores base token addresses and their respective Chainlink price feed addresses.
 */
abstract contract PriceOracle {
    /**
     * @notice Struct to store base token information.
     * @param baseTokenAddress The address of the base token contract.
     * @param priceFeedAddress The address of the Chainlink price feed contract for the base token.
     */
    struct BaseToken {
        address baseTokenAddress;
        address priceFeedAddress;
    }

    /// @notice Mapping of base token symbols to their respective BaseToken structs.
    mapping(string baseTokenSymbol => BaseToken baseToken) private baseTokens;

    /**
     * @notice Adds a new price feed for a base token.
     * @dev Stores the token address and its associated Chainlink price feed.
     * @param baseTokenSymbol The symbol of the base token (e.g., "ETH", "BTC").
     * @param baseTokenAddress The address of the base token contract.
     * @param priceFeedAddress The address of the Chainlink price feed contract for the token.
     */
    function addPriceFeed(string memory baseTokenSymbol, address baseTokenAddress, address priceFeedAddress)
        public
        virtual
    {
        baseTokens[baseTokenSymbol] =
            BaseToken({baseTokenAddress: baseTokenAddress, priceFeedAddress: priceFeedAddress});
    }

    /**
     * @notice Retrieves the contract address of a given base token.
     * @param baseTokenSymbol The symbol of the base token.
     * @return The address of the base token contract.
     */
    function getBaseTokenAddress(string memory baseTokenSymbol) public view returns (address) {
        return baseTokens[baseTokenSymbol].baseTokenAddress;
    }

    /**
     * @notice Retrieves the Chainlink price feed address for a given base token.
     * @param baseTokenSymbol The symbol of the base token.
     * @return The address of the Chainlink price feed contract.
     */
    function getPriceFeedAddress(string memory baseTokenSymbol) public view returns (address) {
        return baseTokens[baseTokenSymbol].priceFeedAddress;
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
        uint256 baseTokenPrice = getPrice(priceFeed);
        // Compute the equivalent quote token amount
        uint256 quoteTokenAmount = (baseTokenPrice * baseTokenAmount) / 1e18;
        return quoteTokenAmount;
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 5e7ee18 (<commit_message>)
