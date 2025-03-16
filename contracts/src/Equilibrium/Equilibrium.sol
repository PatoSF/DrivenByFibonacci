// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import { ERC20Burnable, ERC20 } from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

/*
 * @title Equilibrium
 * Collateral: Exogenous / Endogenous
 * Minting (Stability Mechanism): Decentralized (Algorithmic)
 * Value (Relative Stability): Anchored (Pegged to USD)
 * Collateral Type: Crypto
 *
 * This is the contract meant to be owned by EquilibriumEngine.
 */
contract Equilibrium is ERC20Burnable, Ownable {
    error Equilibrium__AmountMustBeMoreThanZero();
    error Equilibrium__BurnAmountExceedsBalance();
    error Equilibrium__NotZeroAddress();

    constructor() ERC20("Equilibrium", "EQBL") Ownable(msg.sender) { }

    function burn(uint256 _amount) public override onlyOwner {
        uint256 balance = balanceOf(msg.sender);
        if (_amount <= 0) {
            revert Equilibrium__AmountMustBeMoreThanZero();
        }
        if (balance < _amount) {
            revert Equilibrium__BurnAmountExceedsBalance();
        }
        super.burn(_amount);
    }

    function mint(address _to, uint256 _amount) external onlyOwner returns (bool) {
        if (_to == address(0)) {
            revert Equilibrium__NotZeroAddress();
        }
        if (_amount <= 0) {
            revert Equilibrium__AmountMustBeMoreThanZero();
        }
        _mint(_to, _amount);
        return true;
    }
}