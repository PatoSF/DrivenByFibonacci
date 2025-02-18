// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test} from "forge-std/Test.sol";
import {Registry} from "../../src/Registry/Registry.sol";

contract RegistryTest is Test {
    Registry registry;
    address vault = makeAddr("vault");

    function setUp() public {
        registry = new Registry(vault);
    }

    function testWriteTokenData(
        string memory tokenSymbol,
        uint256 stage,
        uint256 subStage,
        Registry.TokenData memory tokenData
    ) public {
        vm.prank(vault);
        registry.writeTokenData(keccak256(bytes(tokenSymbol)), stage, subStage, tokenData);

        Registry.TokenData memory tokenDataReturned = registry.readTokenData(tokenSymbol, stage, subStage, tokenData);

        assertEq(tokenDataReturned.price, tokenData.price);
        assertEq(tokenDataReturned.totalSupply, tokenData.totalSupply);
    }
}
