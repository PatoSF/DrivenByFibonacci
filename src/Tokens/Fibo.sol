// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract FIBO is ERC20, Ownable {
    error InsufficientAmount(uint256 amount);
    error unauthorizedCall();
    constructor () ERC20("Fibonacci", "FIBO") Ownable(msg.sender) {}


///////////////////////////////////////////////////////// Minting & Burning ////////////////////////////////////////////////////////

    function mint(uint256 _amount) internal onlyOwner() { 
        require(_amount > 0, InsufficientAmount(_amount));
        _mint(owner(), _amount);
    }

    function burn(uint256 _amount) internal onlyOwner() {
        require(_amount > 0, InsufficientAmount(_amount));
        _burn(owner(), _amount);
    }

    function _update(address from, address to, uint256 value) internal override {
        _update(from, to, value);    
    }


//////////////////////////////////////////////////////// Unauthorized Calls ///////////////////////////////////////////////////////

    function approve(address spender, uint256 value) public override returns (bool) {
        revert unauthorizedCall();
    }
    function allowance(address owner, address spender) public view override returns (uint256) {
        revert unauthorizedCall();
    }
    function transfer(address to, uint256 value) public override returns (bool) {
        revert unauthorizedCall();
    }
    function transferFrom(address from, address to, uint256 value) public override returns (bool) {
        revert unauthorizedCall();
    }

////////////////////////////////////////////////////////// View Funtions //////////////////////////////////////////////////////////

   /**
    * @dev Throws if the sender is not the owner.
    */
    function checkOwner() public view {
        _checkOwner();
    }
}