// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract Registry is Ownable {
    struct TokenData {
        uint256 price;
        uint256 totalSupply;
    }

    mapping(bytes32 tokenSymbolHash => mapping(uint256 stage => mapping(uint256 subStage => TokenData))) private
        tokenSymbolHashToStageToSubstageToTokenData;

    constructor(address vault) Ownable(vault) {}

    function writeTokenData(bytes32 tokenSymbolHash, uint256 stage, uint256 subStage, TokenData memory tokenData)
        external
        onlyOwner
    {
        tokenSymbolHashToStageToSubstageToTokenData[tokenSymbolHash][stage][subStage] = tokenData;
    }

    function readTokenData(string memory tokenSymbol, uint256 stage, uint256 subStage, TokenData memory tokenData)
        external
        returns (TokenData memory)
    {
        return tokenSymbolHashToStageToSubstageToTokenData[keccak256(bytes(tokenSymbol))][stage][subStage] = tokenData;
    }
}
