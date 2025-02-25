// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Market} from "../Interfaces/IMarket.sol";
import {DataTypes} from "../Libraries/DataTypes.sol";
import {Events} from "../Libraries/Events.sol";
import {Errors} from "../Libraries/Errors.sol";

contract MarketVault {
    IMarket public Market;
    constructor(IMarket _market) {
        Market = _market;
    }

    // Withdraw ERC20 tokens
    function withdraw(address token, uint256 amount) external {
        require(deposits[token][msg.sender] >= amount, "Insufficient balance");
        deposits[token][msg.sender] -= amount;
        IERC20(token).transfer(msg.sender, amount);
    }

}