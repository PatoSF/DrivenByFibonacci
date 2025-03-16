// // SPDX-License-Identifier: UNLICENSED
// pragma solidity ^0.8.27;

// import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
// import {Constants} from "../Libraries/Constants.sol";

// /**
// * @title TimeLock
// * @author Team EulerFi
// * @notice Extend TimelockController to add custom delay logic
// * @dev This contract extends TimelockController and provides a way to set custom delay periods 
// *      for specific target functions or contract addresses. 
// *
// *      To maintain compatibility with the existing TimelockController logic, especially regarding role-based 
// *      access control and event emissions, minDelay will be set to 7 days in seconds.
// */


// // N I'm considering switching this contract to an abstract contract so we can use it wherever we want efficiently.
// contract TimeLock is TimelockController {

//     constructor(
//         uint256 minDelay,
//         address[] memory proposers,
//         address[] memory executors,
//         address admin
//     ) TimelockController(minDelay, proposers, executors, admin) {}



// /**
// * As you can see in the scheduleBatch function, only the PROPOSER_ROLE has access to it.
// * This function will be used to :
// *   1. Schedule all of the substages throughout the next stage.
// *   2. Schedule the minting and/or price increase at the start of each substage.
// *
// * The PROPOSER_ROLE shouldn't be allowed to input whatever he wants.
// * We will provide a struct or a mapping idk that will store the data that will be used for this function.
// * We will need to create a function in the Registry contract, that will calculate the substages, 
// * the price increase and token increase at each substage to be inputed in this function.
// * Tbh here the proposer role is useless here because the proposer will propose a number of substages for the 
// * next stage, propose a price increase and a token increase in the governance contract.
// * The TimeLock should retrieve this data. Then a SCHEDULER_ROLE will be used to call this function.
// * When we reach the required time, the EXECUTOR_ROLE can execute the functions like Minting and SetPrice 
// * inside the FIBOVault contract.
// *
// * I'm thinking of removing the PROPOSER_ROLE and adding a SCHEDULER_ROLE below. 
// */

//     function scheduleBatch(
//         address[] calldata targets,
//         uint256[] calldata values,
//         bytes[] calldata payloads,
//         bytes32 predecessor,
//         bytes32 salt,
//         uint256 delay
//     ) public override onlyRole(PROPOSER_ROLE) {
//         scheduleBatch(targets, values, payloads, predecessor, salt, delay);
//     }

// /** 
// * The schedule function is used to schedule single tasks like going from a stage to another.
// * Since we're calling it once per year.
// */
//     function schedule(
//         address target,
//         uint256 value,
//         bytes calldata data,
//         bytes32 predecessor,
//         bytes32 salt,
//         uint256 delay
//     ) public override onlyRole(PROPOSER_ROLE) {
//         schedule(target, value, data, predecessor, salt, delay);
//     }
  
// /**
// * onlyRoleOrOpenRole : provides a more flexible approach by allowing a function to be 
// * called by anyone if the role is assigned to be zero address. If the role is not
// * open (not assigned to address(0)) then the caller must have the specified role.
// * This is useful in scenarios where we want to allow open access to a function
// * under certain conditions.
// */

//     function executeBatch(
//         address[] calldata targets,
//         uint256[] calldata values,
//         bytes[] calldata payloads,
//         bytes32 predecessor,
//         bytes32 salt
//     ) public payable override onlyRoleOrOpenRole(EXECUTOR_ROLE) {
//         executeBatch(targets, values, payloads, predecessor, salt);
//     }

//     function execute(
//         address target,
//         uint256 value,
//         bytes calldata payload,
//         bytes32 predecessor,
//         bytes32 salt
//     ) public payable override onlyRoleOrOpenRole(EXECUTOR_ROLE) {
//         execute(target, value, payload, predecessor, salt);
//     }

// /**
// Yogi these are not all the functions that we will be implimenting in the contract
// * so go through the TimeLockController and see what functions we might need to override.
// */

// }
