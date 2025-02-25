// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract FIBO is ERC20, Ownable {
    error InsufficientAmount(uint256 amount);
    constructor () ERC20("Euler", "ELR") Ownable(msg.sender) {}

///////////////////////////////////////////////////////// Minting & Burning ////////////////////////////////////////////////////////

    function mint(uint256 _amount) internal onlyOwner() { 
        require(_amount > 0, InsufficientAmount(_amount));
        _mint(owner(), _amount);
    }

    function burn(uint256 _amount) internal onlyOwner() {
        require(_amount > 0, InsufficientAmount(_amount));
        _burn(owner(), _amount);
    }

////////////////////////////////////////////////////////// View Funtions //////////////////////////////////////////////////////////

   /**
    * @dev Throws if the sender is not the owner.
    */
    function checkOwner() public view {
        _checkOwner();
    }

}   