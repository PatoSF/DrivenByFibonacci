// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract FIBO is ERC20, Ownable {
    error InsufficientAmount(uint256 amount);
    constructor () ERC20("Fibonacci", "FIBO") Ownable(msg.sender) {}


///////////////////////////////////////////////////////// Minting & Burning /////////////////////////////////////////////////////////

    function mint(uint256 _amount) internal { 
        require(_amount > 0, InsufficientAmount(_amount));
        _mint(owner(), _amount);
    }

    function burn(uint256 _amount) internal {
        require(_amount > 0, InsufficientAmount(_amount));
        _burn(owner(), _amount);
    }

////////////////////////////////////////////////////////// Access Control //////////////////////////////////////////////////////////

    /**
    * @dev Transfers ownership of the contract to a new account (`newOwner`).
    * Can only be called by the current owner.
    */
    function transferOwnership(address newOwner) public override {
        transferOwnership(newOwner);
    }

////////////////////////////////////////////////////////// View Funtions //////////////////////////////////////////////////////////

    /**
    * @dev Returns the name of the token.
    */
    function name() public view override returns (string memory) {
        return name();
    }
    
    /**
    * @dev Returns the symbol of the token, usually a shorter version of the name.
    */
    function symbol() public view override returns (string memory) {
        return symbol();
    }

    /**
    * @dev Returns the number of decimals used to get its user representation.
    * For example, if `decimals` equals `2`, a balance of `505` tokens should
    * be displayed to a user as `5.05` (`505 / 10 ** 2`).
    *
    * Tokens usually opt for a value of 18, imitating the relationship between
    * Ether and Wei. This is the default value returned by this function, unless
    * it's overridden.
    *
    * NOTE: This information is only used for _display_ purposes: it in
    * no way affects any of the arithmetic of the contract, including
    * {IERC20-balanceOf} and {IERC20-transfer}.
    */
    function decimals() public view override returns (uint8) {
        return decimals();
    }

    /**
    * @dev Returns the value of tokens in existence.
    */
    function totalSupply() public view override returns (uint256) {
        return totalSupply();
    }

    /**
    * @dev Returns the address of the current owner.
    */
    function owner() public view override returns (address) {
        owner();
    }

   /**
    * @dev Throws if the sender is not the owner.
    */
    function checkOwner() public view {
        _checkOwner();
    }
}