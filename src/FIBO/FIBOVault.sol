// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {Datatypes} from "../Libraries/Datatypes.sol";
import {Events} from "../Libraries/Events.sol";
/**
* @title FIBO Vault 
* @author Team EulerFi
* @notice Standard ERC4626 vault with minting and burning capabilities
*/
contract FiboVault is ERC4626 {

    /**
    * @dev Token being managed
    */
    IERC20 public immutable Token;

    /**
    * @notice Tracks stage Information
    * @dev Return a struct with total substages, substage duration, total price increase and total supply increase
    */
    mapping (uint256 => DataTypes.Stage) public StageInfo;

    /**
    * @notice Tracks substages Information
    * @dev Return a struct with price increase and supply increase per substage
    */
    mapping (uint256 => mapping (uint256 => DataTypes.Substage)) public SubstageInfo;

    /** 
    * @dev Tracks user balances
    */
    mapping (address => uint256) public balance;

    /**
    * @notice Tracks token listings
    * @dev Return a struct with token address and amount
    */
     mapping(address => DataTypes.TokenListing[]) public listings;

    constructor(IERC20 _asset, address _timelock) ERC4626(_asset) { 
        Token = _asset;
    }

}