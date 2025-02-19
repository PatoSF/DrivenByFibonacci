// SPDX-License-Identifier: MIT
pragma solidity 0.8.27;






library Constants {
    /**
     * @notice Denominator used for mathematical calculations.
     * @dev    This constant is used as a divisor in various mathematical calculations
     *         throughout the contract to achieve precise percentages and ratios.
     */
    uint256 public constant DENOMINATOR = 1_000_000;

    // Roles
    /**
     * @notice The role assigned to external keepers responsible for specific protocol functions.
     * @dev    This role is assigned to external entities that are responsible for performing specific
     *         functions within the protocol, such as validator upkeep and maintenance.
     */
    bytes32 public constant KEEPER_ROLE = keccak256("KEEPER_ROLE");

    /**
     * @notice The role assigned to governance entities responsible for managing protocol parameters.
     * @dev    This role is assigned to governance entities that have the authority to manage and
     *         update various protocol parameters, ensuring the smooth operation and evolution of the protocol.
     */
    bytes32 public constant GOVERNANCE_ROLE = keccak256("GOVERNANCE_ROLE");

    /**
     * @notice The role assigned to KYCed institutions responsible for depositing and withdrawing ETH.
     * @dev    This role is assigned to investors that have the authority to manage and custody funds
     *         on behalf of institution.
     */
    bytes32 public constant INVESTOR_ROLE = keccak256("INVESTOR_ROLE");

    /**
     * @notice Paused status indicator when depositing Ether is not paused.
     * @dev    This constant represents the status indicator when depositing Ether is not paused.
     *         It is used as a reference for the depositEtherPaused state variable to determine whether
     *         depositing Ether is currently allowed or paused.
     */
    uint256 public constant _NOT_PAUSED = 1;

    /**
     * @notice Paused status indicator when depositing Ether is paused.
     * @dev    This constant represents the status indicator when depositing Ether is paused.
     *         It is used as a reference for the depositEtherPaused state variable to determine
     *         whether depositing Ether is currently allowed or paused.
     */
    uint256 public constant _PAUSED = 2;
}
