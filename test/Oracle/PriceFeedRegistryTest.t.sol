// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Test} from "forge-std/Test.sol";
import {PriceFeedRegistry} from "../../src/Oracle/PriceFeedRegistry.sol";

contract PriceFeedRegistryTest is Test {
    using PriceFeedRegistry for string;

    function setUp() public {}

    function testGetPriceFeedAddress() public pure {
        string memory baseTokenSymbol = "SCR";
        assertEq(baseTokenSymbol.getPriceFeedAddress(), 0x26f6F7C468EE309115d19Aa2055db5A74F8cE7A5);
    }
}
