// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test, console} from "forge-std/Test.sol";
import {PriceConverter} from "../../src/Oracle/PriceConverter.sol";

contract PriceConverterTest is Test {
    using PriceConverter for string;

    uint256 baseTokenAmount = 1 ether;

    string[] supportedBaseTokens = [
        "COMP",
        "USDe",
        "STG",
        "BNB",
        "LINK",
        "ETH",
        "SCR",
        "SOL",
        "AVAX",
        "DAI",
        "CRV",
        "WBTC",
        "DOGE",
        "STETH",
        "BTC",
        "AAVE",
        "USDT",
        "USDC"
    ];

    function setUp() public {}

    function testGet_SCR_USD_ConversionRate() public view {
        string memory baseTokenSymbol = "SCR";
        uint256 quoteTokenAmount = baseTokenSymbol.getConversionRate(baseTokenAmount);
        console.log("%s SCR = %s USD", baseTokenAmount, quoteTokenAmount);
        assertNotEq(quoteTokenAmount, 0);
    }

    function testGetConversionRatesForAllSupportedBaseTokens() public view {
        for (uint256 i = 0; i < supportedBaseTokens.length; i++) {
            uint256 quoteTokenAmount = supportedBaseTokens[i].getConversionRate(baseTokenAmount);
            console.log("%s %s = %s USD", baseTokenAmount, supportedBaseTokens[i], quoteTokenAmount);
            assertNotEq(quoteTokenAmount, 0);
        }
    }
}
