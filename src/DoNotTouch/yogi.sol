// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

/**
 * @title FIBO Vault 
 * @author Team EulerFi
 * @notice An ERC4626 vault for locked ERC20 tokens with DAO-controlled stages & substages.
 */
contract FiboVault is ERC4626, ERC20, AccessControl {
    /// @dev Roles for governance
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant MULTISIG_ROLE = keccak256("MULTISIG_ROLE");

    /// @dev Timelock mechanism for controlled function execution
    TimelockController public timelock;

    /// @dev Stage & substage tracking
    uint256 public stage;
    uint256 public substage;
    uint256 public price;
    address[] public listedAddresses;

    // ERC4626 already provides name() and symbol() so no need for name and symbol variables do consider this.

    mapping (address => mapping (address => uint256)) public amountlisted;
    
    /// @dev Tracks user balances
    mapping(address => uint256) public balances;
    
    /// @dev Token being managed
    IERC20 public immutable asset;

    /// @dev Tracks substages per stage
    // If each substage only needs one piece of data (like duration or price increase) then below mapping should be used because its gas-efficient.
    // If each substage has multiple properties (like duration, price, and supply increase) then 
    // struct Substage {
       // uint256 duration;    // Duration in days
       // uint256 priceIncrease;  // Price increase per substage
 //N   // uint256 supplyIncrease;  // Supply increase per substage   
     // } 
    // This mapping can be used : mapping(uint256 => mapping(uint256 => Substage))
    mapping(uint256 => uint256) public substageInfo; 

    struct TokenListing {
        uint256 listingId;
        address owner;
        address tokenAddress; // N   Do you really think that we need this. the address will always be FIBO address.
        uint256 amount;
        address desiredToken; // The token user wants in exchange
        // N we should record at which stage and substage the holder decided to list.
        // N In the Market contract we will do the same thing, we will record when his tokens were sold.
    }

    mapping(uint256 => TokenListing) public listings;
    uint256 public listingCounter;

    event TokensListed(
        uint256 indexed listingId,
        address indexed owner,
        address indexed token,
        uint256 amount,
        address desiredToken
    );

    event ListingRemoved(uint256 indexed listingId, address indexed owner);

    /**
     * @dev Constructor initializes the ERC4626 vault with FIBO as the asset.
     *      It also sets up a TimelockController for governance.
     */
    constructor(IERC20 _asset, address _timelock) 
        ERC4626(ERC20(address(_asset))) 
    {
        asset = _asset;
        timelock = TimelockController(_timelock);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(EXECUTOR_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(MULTISIG_ROLE, msg.sender);
        _mint(address(this), 1e9 * (10 ** 18)); // 1 Billion FIBO tokens
    }

    /**
     * @notice Advances the stage, enforcing a 365-day delay.
     * @dev Only callable by EXECUTOR_ROLE.
     */
    function setStage() internal onlyRole(EXECUTOR_ROLE) returns(uint256) {
        require(block.timestamp >= timelock.getMinDelay() + 365 days, "Timelock: Not enough time passed");
        stage += 1;
        // If SetStage() is called elsewhere and the return value is needed → keep it
        // If it's only modifying stage without needing the value elsewhere → remove it
        return stage;
    }

    /**
     * @notice Updates the number of substages before transitioning to a new stage.
     * @dev Must be set before moving to the next stage.
     */
    function setSubstage(uint256 _substage) internal onlyRole(EXECUTOR_ROLE) returns(uint256) {
        require(_substage > 0, "Invalid substage count");
        substage = _substage;
        // Same if used somewhere then only return substage.
        return substage;
    }

    /**
     * @notice Updates the token price per substage.
     * @dev Ensures the new price is greater than the previous price.
     */
    function setPrice(uint256 newPrice) external onlyRole(EXECUTOR_ROLE) returns (uint256) {
        require(newPrice > price, "New price must be higher");
        require(substage > 0, "Substage must be greater than zero") // Added to avoid 0 check for substage
        price = newPrice / substage;
        return price;
    }

    /**
     * @notice Mints new tokens at the beginning of each substage.
     * @dev Can only be called internally by governance functions.
     */
    function mint(uint256 amount) internal onlyRole(MINTER_ROLE) {
        uint256 prevSupply = totalAssets();
        _mint(address(this), amount);
        require(totalAssets() > prevSupply, "Minting failed: Supply did not increase");
    }

    /**
     * @notice Burns tokens, callable only by the protocol via MULTISIG_ROLE.
     */
    function burn(uint256 amount) external onlyRole(MULTISIG_ROLE) {
        require(amount > 0, "Cannot burn 0 tokens");
        _burn(address(this), amount);
    }

    /**
     * @notice Transfers balance ownership from one user to another.
     */
    function updateBalance(address currentHolder, address newHolder, uint256 amount) internal returns (uint256) {
        require(amount > 0, "Amount to transfer should be greater than 0");
        require(balance[currentHolder] >= amount, "Not enough balance");
        // require(amountlisted[currentHolder][address(token)] >= amount, "Not enough balance"); => Not required doing the same thing in above require statement
        balances[currentHolder] -= amount;
        balances[newHolder] += amount;
        return amount;
    }

    function decimals() public view override returns (uint8) {
        return ERC20.decimals();
    }

    /**
     * @notice Returns the total assets in the vault.
     */
    function totalAssets() public view override returns (uint256) {
        return ERC20.totalSupply();
    }

    /**
    * @notice Override the balanceOf function from the ERC20 contract
    * @dev Should retrieve the balance of each user
    * @return the balance of FIBO for an address
    */
    function holderBalance(address account) public view returns (uint256) {
        return balances[account];
    }


//////////////////////////// Arrived here

    /**
     * @notice List tokens for exchange using EIP-2612 permit
     */
    function listTokens(
        address token,
        uint256 amount,
        address desiredToken,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        require(amount > 0, "Amount must be greater than zero");
        require(desiredToken != address(0), "Invalid desired token address");

        // Permit approval (gasless)
        ERC20Permit(token).permit(
            msg.sender,
            address(this),
            amount,
            deadline,
            v,
            r,
            s
        );

        // Transfer tokens to contract
        IERC20(token).transferFrom(msg.sender, address(this), amount);

        // Store listing
        listingCounter++;
        listings[listingCounter] = TokenListing({
            owner: msg.sender,
            tokenAddress: token,
            amount: amount,
            desiredToken: desiredToken
        });

        emit TokensListed(listingCounter, msg.sender, token, amount, desiredToken);
    }

    /**
     * @notice Remove a token listing (only owner can remove)
     */
    function removeListing(uint256 listingId) external {
        TokenListing storage listing = listings[listingId];
        require(msg.sender == listing.owner, "Only owner can remove listing");
        require(listing.amount > 0, "Listing does not exist");

        // Transfer tokens back to the owner
        IERC20(listing.tokenAddress).transfer(listing.owner, listing.amount);

        // Delete listing
        delete listings[listingId];

        emit ListingRemoved(listingId, msg.sender);
    }
}