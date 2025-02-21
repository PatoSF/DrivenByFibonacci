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

    function test_writeTokenData() public {
        string memory tokenSymbol = "FIBO";
        bytes32 tokenSymbolHash = keccak256(bytes(tokenSymbol));

        uint256 stage = 1;
        uint256 subStage = 1;
        Registry.TokenData memory tokenData = Registry.TokenData({price: 1 ether, totalSupply: 1000 ether});

        vm.prank(vault);
        registry.writeTokenData(keccak256(bytes(tokenSymbol)), stage, subStage, tokenData);

        subStage = 2;
        tokenData = Registry.TokenData({price: 1.5 ether, totalSupply: 1500 ether});

        vm.prank(vault);
        registry.writeTokenData(keccak256(bytes(tokenSymbol)), stage, subStage, tokenData);

        assertEq(registry.getLatestStage(tokenSymbolHash), 1);
        assertEq(registry.getLatestSubStage(keccak256(bytes(tokenSymbol)), 1), 2);

        stage = 2;
        subStage = 1;
        tokenData = Registry.TokenData({price: 2 ether, totalSupply: 2000 ether});

        vm.prank(vault);
        registry.writeTokenData(keccak256(bytes(tokenSymbol)), stage, subStage, tokenData);

        assertEq(registry.getLatestStage(tokenSymbolHash), 2);
        assertEq(registry.getLatestSubStage(keccak256(bytes(tokenSymbol)), 2), 1);
    }

    function testFuzz_writeTokenData(
        string memory tokenSymbol,
        uint256 stage,
        uint256 subStage,
        Registry.TokenData memory tokenData
    ) public {
        vm.prank(vault);
        registry.writeTokenData(keccak256(bytes(tokenSymbol)), stage, subStage, tokenData);

        Registry.TokenData memory tokenDataReturned = registry.readTokenData(tokenSymbol, stage, subStage);

        assertEq(tokenDataReturned.price, tokenData.price);
        assertEq(tokenDataReturned.totalSupply, tokenData.totalSupply);
        assertEq(registry.getLatestStage(keccak256(bytes(tokenSymbol))), stage);
        assertEq(registry.getLatestSubStage(keccak256(bytes(tokenSymbol)), stage), subStage);
    }
}
