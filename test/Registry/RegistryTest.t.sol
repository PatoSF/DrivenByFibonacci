// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test} from "forge-std/Test.sol";
import {Registry} from "../../src/Registry/Registry.sol";
import {PriceConverter} from "../../src/Oracle/PriceConverter.sol";

contract RegistryTest is Test {
    using PriceConverter for string;

    Registry registry;
    address vault = makeAddr("vault");

    function setUp() public {
        registry = new Registry(vault);
    }

    function test_writeTokenData() public {
        string memory tokenSymbol = "FIBO";

        uint256 stage = 1;
        uint256 subStage = 1;
        Registry.TokenData memory tokenData = Registry.TokenData({price: 1 ether, totalSupply: 1000 ether});

        vm.prank(vault);
        registry.writeTokenData(tokenSymbol, stage, subStage, tokenData);

        assertEq(registry.getLatestStage(tokenSymbol), 1);
        assertEq(registry.getLatestSubStage(tokenSymbol, 1), 1);

        subStage = 2;
        tokenData = Registry.TokenData({price: 1.5 ether, totalSupply: 1500 ether});

        vm.prank(vault);
        registry.writeTokenData(tokenSymbol, stage, subStage, tokenData);

        assertEq(registry.getLatestStage(tokenSymbol), 1);
        assertEq(registry.getLatestSubStage(tokenSymbol, 1), 2);

        stage = 2;
        subStage = 1;
        tokenData = Registry.TokenData({price: 2 ether, totalSupply: 2000 ether});

        vm.prank(vault);
        registry.writeTokenData(tokenSymbol, stage, subStage, tokenData);

        assertEq(registry.getLatestStage(tokenSymbol), 2);
        assertEq(registry.getLatestSubStage(tokenSymbol, 2), 1);
    }

    function testFuzz_writeTokenData(
        string memory tokenSymbol,
        uint256 stage,
        uint256 subStage,
        Registry.TokenData memory tokenData
    ) public {
        vm.prank(vault);
        registry.writeTokenData(tokenSymbol, stage, subStage, tokenData);

        Registry.TokenData memory tokenDataReturned = registry.readTokenData(tokenSymbol, stage, subStage);

        assertEq(tokenDataReturned.price, tokenData.price);
        assertEq(tokenDataReturned.totalSupply, tokenData.totalSupply);
        assertEq(registry.getLatestStage(tokenSymbol), stage);
        assertEq(registry.getLatestSubStage(tokenSymbol, stage), subStage);
    }

    function test_getLatestPriceOfToken() public {
        string memory tokenSymbol = "FIBO";

        uint256 stage = 1;
        uint256 subStage = 1;
        Registry.TokenData memory tokenData = Registry.TokenData({price: 1 ether, totalSupply: 1000 ether});

        vm.prank(vault);
        registry.writeTokenData(tokenSymbol, stage, subStage, tokenData);

        assertEq(registry.getLatestPriceOfToken(tokenSymbol), 1 ether);

        subStage = 2;
        tokenData = Registry.TokenData({price: 1.5 ether, totalSupply: 1500 ether});

        vm.prank(vault);
        registry.writeTokenData(tokenSymbol, stage, subStage, tokenData);

        assertEq(registry.getLatestPriceOfToken(tokenSymbol), 1.5 ether);

        stage = 2;
        subStage = 1;
        tokenData = Registry.TokenData({price: 2 ether, totalSupply: 2000 ether});

        vm.prank(vault);
        registry.writeTokenData(tokenSymbol, stage, subStage, tokenData);

        assertEq(registry.getLatestPriceOfToken(tokenSymbol), 2 ether);
    }

    function test_getLatestPriceOfTokenInBaseToken() public {
        string memory tokenSymbol = "FIBO";
        string memory baseTokenSymbol = "SCR";
        uint256 baseTokenAmount = 100 ether;

        uint256 stage = 1;
        uint256 subStage = 1;
        uint256 price = 2 ether;
        Registry.TokenData memory tokenData = Registry.TokenData({price: price, totalSupply: 1000 ether});

        vm.prank(vault);
        registry.writeTokenData(tokenSymbol, stage, subStage, tokenData);

        assertEq(registry.getLatestPriceOfToken(tokenSymbol), price);

        assertEq(
            registry.getLatestPriceOfTokenInBaseToken(tokenSymbol, baseTokenSymbol, baseTokenAmount),
            baseTokenSymbol.getConversionRate(baseTokenAmount) * price / 1e18
        );
    }
}
