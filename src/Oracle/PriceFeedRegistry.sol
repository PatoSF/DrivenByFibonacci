// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

library PriceFeedRegistry {
    using Strings for string;

    function getPriceFeedAddress(string memory baseTokenSymbol) internal pure returns (address priceFeedAddress) {
        if (baseTokenSymbol.equal("COMP")) {
            priceFeedAddress = 0x6726C678feE07B25BBE67bC720728652E4129369;
        } else if (baseTokenSymbol.equal("USDe")) {
            priceFeedAddress = 0x812Ef236A7240D8d0d59d61A9E7d67C43eFDB20e;
        } else if (baseTokenSymbol.equal("STG")) {
            priceFeedAddress = 0x9019Be7Aa8f66551E94d6508EA48856386945E80;
        } else if (baseTokenSymbol.equal("BNB")) {
            priceFeedAddress = 0x1AC823FdC79c30b1aB1787FF5e5766D6f29235E1;
        } else if (baseTokenSymbol.equal("LINK")) {
            priceFeedAddress = 0x227a4E5E9239CAc88022DF86B1Ad9B24A7616e60;
        } else if (baseTokenSymbol.equal("ETH")) {
            priceFeedAddress = 0x6bF14CB0A831078629D993FDeBcB182b21A8774C;
        } else if (baseTokenSymbol.equal("SCR")) {
            priceFeedAddress = 0x26f6F7C468EE309115d19Aa2055db5A74F8cE7A5;
        } else if (baseTokenSymbol.equal("SOL")) {
            priceFeedAddress = 0xDf3F55B6bd57084DD4a72a41853C0a2487CB757F;
        } else if (baseTokenSymbol.equal("AVAX")) {
            priceFeedAddress = 0xB4b121ebE4DdCdFD3378b9519A101678829fE8c6;
        } else if (baseTokenSymbol.equal("DAI")) {
            priceFeedAddress = 0x203322e1d15EB3Dff541a5aF0288D951c4a8d3eA;
        } else if (baseTokenSymbol.equal("CRV")) {
            priceFeedAddress = 0x8658273E2f7bc06d3F8462703b8a733204312fF2;
        } else if (baseTokenSymbol.equal("WBTC")) {
            priceFeedAddress = 0x61C432B58A43516899d8dF33A5F57edb8d57EB77;
        } else if (baseTokenSymbol.equal("DOGE")) {
            priceFeedAddress = 0x2667de5E58Ae152ce9c5EA6D1a8E051444294B82;
        } else if (baseTokenSymbol.equal("STETH")) {
            priceFeedAddress = 0x439a2b573C8Ecd215990Fc25b4F547E89CF67b79;
        } else if (baseTokenSymbol.equal("BTC")) {
            priceFeedAddress = 0xCaca6BFdeDA537236Ee406437D2F8a400026C589;
        } else if (baseTokenSymbol.equal("AAVE")) {
            priceFeedAddress = 0x538E0fC727ce4604e25354D082890cdb5553d33B;
        } else if (baseTokenSymbol.equal("USDT")) {
            priceFeedAddress = 0xf376A91Ae078927eb3686D6010a6f1482424954E;
        } else if (baseTokenSymbol.equal("USDC")) {
            priceFeedAddress = 0x43d12Fb3AfCAd5347fA764EeAB105478337b7200;
        }
    }
}
