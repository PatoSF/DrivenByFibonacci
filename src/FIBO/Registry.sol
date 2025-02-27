// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
/**
 * @title Registry
 * @dev A contract to store and manage token data across multiple stages and substages.
 *      It allows tracking of the latest stage and subStage for a given token.
 */

contract Registry is Ownable {
    /// @notice Structure to store token-related data.
    /// @param price The price of the token.
    /// @param totalSupply The total supply of the token.
    struct TokenData {
        uint256 price;
        uint256 totalSupply;
    }

    /// @dev Mapping to store token data for each (tokenSymbolHash, stage, subStage).
    mapping(bytes32 tokenSymbolHash => mapping(uint256 stage => mapping(uint256 subStage => TokenData))) private
        tokenSymbolHashToStageToSubstageToTokenData;

    /// @dev Mapping to store the latest stage for each token.
    mapping(bytes32 tokenSymbolHash => uint256 stage) private latestStage;

    /// @dev Mapping to store the latest subStage for a given (tokenSymbolHash, stage).
    mapping(bytes32 tokenSymbolHash => mapping(uint256 stage => uint256 subStage)) private latestSubStage;

    /**
     * @notice Constructor to set the initial owner of the contract.
     * @param vault The address that will be set as the contract owner.
     */
    constructor(address vault) Ownable(vault) {}

    /**
     * @notice Writes token data for a given token, stage, and subStage.
     * @dev Updates the latest stage and subStage if the new values are greater.
     * @param tokenSymbol The string representation of the token symbol.
     * @param stage The stage of the token.
     * @param subStage The subStage within the given stage.
     * @param tokenData The token data to be stored.
     */
    function writeTokenData(string memory tokenSymbol, uint256 stage, uint256 subStage, TokenData memory tokenData)
        external
        onlyOwner
    {
        bytes32 tokenSymbolHash = keccak256(bytes(tokenSymbol));
        tokenSymbolHashToStageToSubstageToTokenData[tokenSymbolHash][stage][subStage] = tokenData;

        // Update the latest stage if this stage is greater
        if (stage > latestStage[tokenSymbolHash]) {
            latestStage[tokenSymbolHash] = stage;
        }

        // Update the latest subStage if this subStage is greater
        if (subStage > latestSubStage[tokenSymbolHash][stage]) {
            latestSubStage[tokenSymbolHash][stage] = subStage;
        }
    }

    /**
     * @notice Reads token data for a given token, stage, and subStage.
     * @dev Converts the token symbol to a hash before lookup.
     * @param tokenSymbol The string representation of the token symbol.
     * @param stage The stage of the token.
     * @param subStage The subStage within the given stage.
     * @return The stored TokenData for the given parameters.
     */
    function readTokenData(string memory tokenSymbol, uint256 stage, uint256 subStage)
        external
        view
        returns (TokenData memory)
    {
        return tokenSymbolHashToStageToSubstageToTokenData[keccak256(bytes(tokenSymbol))][stage][subStage];
    }

    /**
     * @notice Retrieves the latest recorded stage for a given token symbol hash.
     * @param tokenSymbol The string representation of the token symbol.
     * @return The latest stage number recorded for the given token.
     */
    function getLatestStage(string memory tokenSymbol) external view returns (uint256) {
        return latestStage[keccak256(bytes(tokenSymbol))];
    }

    /**
     * @notice Retrieves the latest recorded subStage for a given token symbol hash and stage.
     * @param tokenSymbol The string representation of the token symbol.
     * @param stage The stage number for which the latest subStage is requested.
     * @return The latest subStage number recorded for the given stage.
     */
    function getLatestSubStage(string memory tokenSymbol, uint256 stage) external view returns (uint256) {
        return latestSubStage[keccak256(bytes(tokenSymbol))][stage];
    }

    /**
     * @notice Retrieves the latest recorded price of a given token.
     * @dev Fetches the price from the most recent stage and sub-stage recorded for the token.
     * @param tokenSymbol The string representation of the token symbol.
     * @return The latest price of the token.
     */
    function getLatestPriceOfToken(string memory tokenSymbol) public view returns (uint256) {
        bytes32 tokenSymbolHash = keccak256(bytes(tokenSymbol));
        return tokenSymbolHashToStageToSubstageToTokenData[tokenSymbolHash][latestStage[tokenSymbolHash]][latestSubStage[tokenSymbolHash][latestStage[tokenSymbolHash]]]
            .price;
    }
}
