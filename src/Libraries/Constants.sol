// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

/**
* @notice Add hardcoded constants and roles here
*/

library Constants {
    /**
    * @notice Duration of the whole Stage - 1 year - in seconds 
    * @dev    This constant is used in various mathematical calculations 
    *         throughout the contract to achieve precise percentages and ratios
    */
    uint256 public constant STAGE_DURATION = 31536000; // 1 year in seconds

    /**
    * @notice SCHEDULER_ROLE can only set delays for functions 
    * @dev    He will do so using data provided by the DAO
    */
    bytes32 public constant SCHEDULER_ROLE = keccak256("SCHEDULER_ROLE");

    /**
    * @notice TIMELOCK_ADMIN_ROLE is the owner of the TimeLock contract
    * @dev    The TIMELOCK_ADMIN_ROLE can be the protocol using a multisig
    *         It can modify the data from the DAO in case of a security breach
    */
    bytes32 public constant TIMELOCK_ADMIN_ROLE = keccak256("TIMELOCK_ADMIN_ROLE");


    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant MULTISIG_ROLE = keccak256("MULTISIG_ROLE");



}