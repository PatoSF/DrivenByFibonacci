// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {FIBO} from "../Tokens/FIBO.sol";
import {Euler} from "../Tokens/Euler.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
import {DataTypes} from "../Libraries/DataTypes.sol";
import {Events} from "../Libraries/Events.sol";
import {Errors} from "../Libraries/Errors.sol";

/**
* @title FIBO Vault 
* @author Team EulerFi
* @notice Standard ERC4626 vault with minting and burning capabilities
*/
contract FiboVault {
    IERC20 public Fibo;
    IERC20 public EuLer;

    // Stage Number
    uint256 private stage; 
    // Substage Number
    uint256 private substage;
    // Current Price
    uint256 private price;
    /**
     * @dev Tracks stage Information
     */
    mapping (uint256 => DataTypes.Stage) public StageInfo;

    /**
     * @dev Tracks substages Information
     */
    mapping(uint256 => mapping(uint256 => DataTypes.Substage)) public SubstageInfo;

    /**
     * @dev Tracks previous substages Information
     */
    mapping (uint256 => mapping (uint256 => DataTypes.PreviousInfo)) public PreviousInfo;

    constructor(IERC20 _asset, IERC20 _Euler) { 
        Fibo = _asset;
        EuLer = _Euler;
      
    }

    /////////////////////////////////////////////////// Setting Stage & Substage ///////////////////////////////////////////////////

    /**
     * @notice Only the INITIALIZE_ROLE can call 'initializeStage'
     * @dev Initializes the stage and substage
     *
     * Sets the new stage number and resets the substage number to 1
     * Sets the price, total supply of FIBO and the maximum number of substages in each stage
     * @param _maxsubstage The maximum number of substages per stage
     * @param _newprice The new price of FIBO
     * @param _newTotalSupply The new supply of FIBO before minting
     */
    function initializeStage(uint256 _maxsubstage, uint256 _newprice, uint256 _newTotalSupply) public payable {
        //Todo Add onlyRole(INITIALIZER_ROLE)
        //Todo Add TimeLock | 365 days
        //Todo Restrict Executor access until DAO approval
        setStage();
        setMaxSubstage(_maxsubstage);
        setPrice(_newprice);
        setNewTokenSupply(_newTotalSupply);
        
        CalculateSubstageDuration();
        // CalculateSubstagePrice();
        // CalculateSubtageTokenIncrease();
        updateSubstage();
        // updatePrice();
        // updateTokenSupply();

        emit Events.StageInitialized(stage, _maxsubstage, _newprice, _newTotalSupply);
    }

    /**
     * @notice Resetting substages to 1 before going to a new stage
     * @dev Must be set before moving to the next stage
     * @return The current substage
     */
    function updateSubstage() public payable returns (uint256) {
        //Todo Add onlyRole(EXECUTOR_ROLE)
        //Todo Add timelock | depending on substageDuration
        //Todo Restrict Executor access until DAO approval
        require(StageInfo[stage].maxSubstage >= substage, "Substage must be maximum maxsubstage");
        if (PreviousInfo[stage][substage].previousStage < stage) {   
            PreviousInfo[stage][substage].previousStage = stage;
            substage = 1;
            PreviousInfo[stage][substage].previousPrice = StageInfo[stage-1].price;
        } else {
            substage += 1;
        }
        updatePrice();
        updateTokenSupply();
        return substage;
    }

/////////////////////////////////////////////////////////////// User Function //////////////////////////////////////////////////////////////////

    /**
     * @notice Can only be called once per substage
     * @dev Allows users to claim their tokens
     * @return The amount of tokens sent
     */
    function getUserTokens() public returns (uint256) {
        // Add timelock | depending on substageDuration | getUserTokens() can only be called once per substage
        uint256 incrementInTotalSupply = Fibo.totalSupply() - PreviousInfo[stage][substage].previousTotalSupply;
        uint256 tokensToSend = ((Fibo.balanceOf(msg.sender) * incrementInTotalSupply) * 1e18) / PreviousInfo[stage][substage].previousTotalSupply;
        FIBO(address(Fibo)).update(address(this), msg.sender, tokensToSend);
        return tokensToSend;
    }

    /**
     * @dev Mints FIBO tokens for the Euler
     * @param _amount The amount of FIBO tokens being minted
     * @return The amount of FIBO tokens minted
     */
    function mintFIBO4Euler(uint256 _amount) public returns (uint256) {
        //Todo  Add timelock restriction so holder can swap their tokens at the beginning of each stage.
        require(_amount > 0, "Amount to burn should be greater than 00");
        //Todo we need to check the balance of the user Euler to make sure he has enough tokens
        Euler(address(EuLer)).burn(_amount);
        mint(_amount);
        FIBO(address(Fibo)).update(address(0), msg.sender, _amount);
        return _amount;
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////// Internal Functions //////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////// Setter Functions ///////////////////////////////////////////////////////////////
    /**
     * @dev Updates the current stage
     * @return The current stage
     */
    function setStage() internal returns(uint256) {
        PreviousInfo[stage][substage].previousStage = stage;
        stage += 1;
        SubstageInfo[stage][substage].stageId = stage;
        return stage;
    }

    /**
     * @dev Sets the maximum number of substages per stage
     * @return The maximum number of substages in the current stage
     */
    function setMaxSubstage(uint256 _maxsubstage) internal returns (uint256) {
        StageInfo[stage].maxSubstage = _maxsubstage;
        return StageInfo[stage].maxSubstage;
    }

    /**
     * @dev Sets the new price of FIBO 
     * @return The new price
     * @param _price The new updated price
     */
    function setPrice(uint256 _price) internal returns (uint256) {
        require(_price > StageInfo[stage].price, "New price must be higher");
        StageInfo[stage].price = _price * 1e18;
        return StageInfo[stage].price;
    }

    /**
     * @dev Sets the new supply of FIBO before minting
     * @return The new supply
     * @param _newsupply The new supply
     */
    function setNewTokenSupply (uint256 _newsupply) internal returns (uint256) { 
        require(_newsupply > StageInfo[stage].artificialSupply, "Amount to mint should be greater than current supply");
        StageInfo[stage].artificialSupply = _newsupply;
        return StageInfo[stage].artificialSupply;
    }

    ///////////////////////////////////////////////////////////////// Calculations /////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////// Calculations /////////////////////////////////////////////////////////////////

    function CalculateSubstagePrice() public returns(uint256) {
        require(StageInfo[stage].price >= price, "Wrong Price");
        SubstageInfo[stage][substage].substagePrice = (StageInfo[stage].price - PreviousInfo[stage][substage].previousPrice) / StageInfo[stage].maxSubstage;
        return SubstageInfo[stage][substage].substagePrice;
    }
    function CalculateSubtageTokenIncrease() internal returns(uint256) {
        SubstageInfo[stage][substage].substageTokenIncrease = ((StageInfo[stage].artificialSupply - PreviousInfo[stage][substage].previousTotalSupply) * 1e18) / StageInfo[stage].maxSubstage;
        return SubstageInfo[stage][substage].substageTokenIncrease;
    }

    function CalculateSubstageDuration() internal returns(uint256) {
        StageInfo[stage].substageDuration = (365 days * 1e18) / StageInfo[stage].maxSubstage;
        return StageInfo[stage].substageDuration;
    }

    /////////////////////////////////////////////////////////////// Update Functions ///////////////////////////////////////////////////////////////

    /**
     * @dev Updates the token price per substage
     */
    function updatePrice() internal returns (uint256) {
        SubstageInfo[stage][substage].substagePrice = CalculateSubstagePrice();
        PreviousInfo[stage][substage].previousPrice = price;
        price += SubstageInfo[stage][substage].substagePrice;
        return price;
    }

    /**
     * @dev Updates the token supply per substage
     * @return The new FIBO supply
     */
    function updateTokenSupply() internal returns (uint256) {
        DataTypes.Substage storage substageInfo = SubstageInfo[stage][substage];

        SubstageInfo[stage][substage].substageTokenIncrease = CalculateSubtageTokenIncrease();
        PreviousInfo[stage][substage].previousTotalSupply = Fibo.totalSupply();
        mint(SubstageInfo[stage][substage].substageTokenIncrease);
        substageInfo.newSubstageSupply = Fibo.totalSupply();
        return substageInfo.newSubstageSupply;
    }

    ////////////////////////////////////////////////////////////// Minting & Burning ///////////////////////////////////////////////////////////////

    /**
     * @notice Mints new tokens at the beginning of each substage
     * @dev Can only be called internally by the DAO
     * @param _amount The amount of tokens to be minted
     */
    function mint(uint256 _amount) internal {
        require(_amount > 0, "Amount to burn should be greater than 0");
        uint256 prevSup = Fibo.balanceOf(address(this));
        FIBO(address(Fibo)).mint(_amount);
        require(Fibo.balanceOf(address(this)) > prevSup, "Minting failed: Supply did not increase");
    }

    // /**
    //  * @dev Burns tokens, callable only by the protocol via MULTISIG_ROLE
    //  * @param _amount The amount of tokens to be burned
    //  */
    // function burn(uint256 _amount) public {
    //     //Todo Add onlyRole(MULTISIG_ROLE)
    //     require(_amount > 0, "Amount to burn should be greater than 00");
    //     FIBO(address(Fibo)).burn(_amount);
    // }

    //////////////////////////////////////////////////////////////// Update Balance ////////////////////////////////////////////////////////////////

    /**
     * @dev Transfers balance from one holder to another
     * @param _currentHolder Current holder of the FIBO tokens
     * @param _newHolder The new owner (aka buyer) of the balance
     * @param _amount The amount of FIBO tokens being exchanged
     * @return The amount of tokens that have been transferred
     */
    function updateBalance(address _currentHolder, address _newHolder, uint256 _amount) public returns (uint256) {
        //Todo Add access control | Can only be called by the Market
        FIBO(address(Fibo)).update(_currentHolder, _newHolder, _amount);
        return _amount;
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////// View Funtions /////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    function getStage() public view returns (uint256) {
        return stage;
    }

    function getSubstage() public view returns (uint256) {
        return substage;
    }
    function getPrice() public view returns(uint256) {
        return price;
    }
    function totalBalance() public view returns (uint256) {
        return Fibo.balanceOf(msg.sender) * price;
    }
    function balance() public view returns (uint256) {
        return Fibo.balanceOf(msg.sender);
    }
    
}