// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {FIBO} from "../Tokens/FIBO.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
import {DataTypes} from "../Libraries/DataTypes.sol";
import {Events} from "../Libraries/Events.sol";
import {Errors} from "../Libraries/Errors.sol";
import {Registry} from "./Registry.sol";
import {Market} from "./Market.sol";
/**
 * @title FIBO Vault
 * @author Team EulerFi
 * @notice Standard ERC4626 vault with minting and burning capabilities
 */

contract FiboVault is ERC4626, FIBO {
    Registry private registry;
    Market private market;
    // Stage Number
    uint256 private stage;
    // Substage Number
    uint256 private substage;
    // Max Substage per Stage
    uint256 private maxSubstage;
    // Total Price Increase
    uint256 private price;
    // Total Supply before minting
    uint256 private artificialSupply;
    // Substage Price Increase
    uint232 private substagePrice;
    // Substage Token Increase
    uint256 private substageTokenIncrease;
    // Previous Price
    uint256 private previousPrice;
    // New Price after each substage
    uint256 private newPrice;
    // New Total Supply after each substage
    uint256 private newTotalSupply;
    // Previous Total Supply
    uint256 private previousTotalSupply;
    // Previous Stage
    uint256 private previousStage;

    uint256 private substageDuration;

    /**
     * @notice Tracks substages Information
     * @dev Return a struct with price increase and supply increase per substage
     */
    mapping(uint256 => mapping(uint256 => DataTypes.Substage)) public SubstageInfo;

    constructor(IERC20 _asset, uint256 _maxsubstage, uint256 _newprice, uint256 _newTotalSupply) ERC4626(_asset) {
        initializeStage(_maxsubstage, _newprice, _newTotalSupply);
    }

    /////////////////////////////////////////////////// Setting Stage & Substage ///////////////////////////////////////////////////

    /**
     * @notice Only the INITIALIZE_ROLE can call 'initializeStage'
     * @dev Initializes the stage and substage.
     *
     * Sets the new stage number and resets the substage number to 1.
     * Sets the price, total supply of FIBO and the maximum number of substages in each stage.
     * @param _maxsubstage The maximum number of substages per stage.
     * @param _newprice The new price of FIBO.
     * @param _newTotalSupply The new supply of FIBO before minting.
     */
    function initializeStage(uint256 _maxsubstage, uint256 _newprice, uint256 _newTotalSupply) public {
        //Todo Add onlyRole(INITIALIZER_ROLE)
        //Todo Add TimeLock | 365 days
        //Todo Restrict Executor access until DAO approval
        setStage();
        setMaxSubstage(_maxsubstage);
        updateSubstage();
        setPrice(_newprice);
        setNewTokenSupply(_newTotalSupply);

        CalculateSubstageDuration();
        CalculateSubstagePrice();
        CalculateSubtageTokenIncrease();

        updatePrice();
        updateTokenSupply();

        emit Events.StageInitialized(stage, _maxsubstage, _newprice, _newTotalSupply);
    }

    /**
     * @notice Resetting substages to 1 before going to a new stage.
     * @dev Must be set before moving to the next stage.
     */
    function updateSubstage() public returns (uint256) {
        //Todo Add onlyRole(EXECUTOR_ROLE)
        //Todo Add timelock | depending on substageDuration
        //Todo Restrict Executor access until DAO approval
        require(maxSubstage >= substage, "Substage must be maximum maxsubstage");
        if (previousStage < stage) {
            previousStage = stage;
            substage = 1;
        } else {
            substage += 1;
        }
        updatePrice();
        updateTokenSupply();
        registry.writeTokenData(
            name(),
            stage,
            substage,
            registry.tokenSymbolHashToStageToSubstageToTokenData[keccak256(bytes(name()))][stage][substage].tokenData({
                price: newPrice,
                supply: totalSupply()
            })
        );
        return substage;
    }

    /**
     * @notice When minting or burning tokens, we need to use a token distribution mechanism to distribute the tokens proportionally.
     *         We will need to create a function for them to call to see how many tokens they got from a stage to another and from
     *         a substage to another.
     * @notice We will also need to create a funtion that calculates their total balance * the price of the FIBO so they can get
     *         the total worth of their balance.
     * @notice If they want to list their tokens for sale : If they decide to sell all their tokens, they will choose "List All" button
     *         on the frontend so we will a boolean or uint2 (if its 1 that means sell all or else its 0 that means they will specify
     *         the amount) they want to sell.
     */

    // we need to retrieve the balance of the user and the total token supply + the amount that will be minted
    // 1000 tokens , total supply is 1,000,000 tokens,  100,000 new tokens -> the new total supply is 1,100,000 tokens
    // 0.001% of the total supply
    // (1000 * 100,000) / 1,000,000 = 100
    // he will get 100 tokens from the 100,000 tokens minted
    // we will need to account for rounding Errors
    // minimumsubstageDuration = 1 month

    function getUserTokens() public {
        // // Add timelock | depending on substageDuration
        // require(block.timestamp >= substageDuration, "Cannot claim tokens before the required duration");

        // uint256 userTokens = calculateUserTokens(msg.sender);
        // require(userTokens > 0, "No tokens to claim");

        // userUnclaimedTokens[msg.sender] = 0; // Reset unclaimed tokens after claiming

        // _transfer(address(this), msg.sender, userTokens);
        // //Todo add timelock | depending on substageDuration
        // getTokens(); //Todo getTokens should calculate the amount of tokens that the holder will receive at each substage
        // we need to store user's data after each stage so we can calculate the amount of tokens that the user will receive at each substage
        // He can call the function in every substage however if he decides to call it once at the each of all the substages
        // he will get all of his tokens. so we need to store the amount of tokens not yet transfered to see how many tokens he will receive
        // from them by also considering the newly token supply minted.

        uint256 incrementInTotalSupply = newTotalSupply - previousTotalSupply;
        uint256 userBalance = balanceOf(msg.sender);
        uint256 tokensToSend = (userBalance * incrementInTotalSupply) / previousTotalSupply; // (1000 * 100,000) / 1,000,000 = 100

        _transfer(address(this), msg.sender, tokensToSend);

        // For the leftover tokens, we can implement a withdraw function that only allows the protocol/admin to withdraw the leftover tokens fom the vault.
        // But, to enable that, we need to keep track of the holders status i.e.,
        // if (numberOfTokenHolders == numberOfGetUserTokensCalls) {
        //      withdrawLeftOverEnabled = true;
        // }
        // Are we tracking the unique holders of the token???
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////// Internal Functions //////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /////////////////////////////////////////////////////////////// Setter Functions ///////////////////////////////////////////////////////////////
    /**
     * @dev Updates the current stage.
     */
    function setStage() internal returns (uint256) {
        stage += 1;
        return stage;
    }

    /**
     * @dev Sets the maximum number of substages per stage
     */
    function setMaxSubstage(uint256 _maxsubstage) internal returns (uint256) {
        maxSubstage = _maxsubstage;
        return maxSubstage;
    }

    /**
     * @dev Sets the new price of FIBO
     */
    function setPrice(uint256 _price) internal returns (uint256) {
        require(_price > price, "New price must be higher");
        price = _price;
        return price;
    }

    /**
     * @dev Sets the new supply of FIBO before minting
     */
    function setNewTokenSupply(uint256 _newTotalSupply) internal returns (uint256) {
        require(_newTotalSupply > totalSupply(), "Amount to mint should be greater than current supply");
        artificialSupply = _newTotalSupply;
        return artificialSupply;
    }

    ///////////////////////////////////////////////////////////////// Calculations /////////////////////////////////////////////////////////////////

    function CalculateSubstagePrice() internal returns (uint256) {
        substagePrice = ((price - previousPrice)) / substage;
        //Todo apply multiplication to account for rounding errors
        return substagePrice;
    }

    function CalculateSubtageTokenIncrease() internal returns (uint256) {
        substageTokenIncrease = ((artificialSupply - previousTotalSupply) * 1e18) / substage;
        //Todo apply multiplication to account for rounding errors
        return substageTokenIncrease;
    }

    function CalculateSubstageDuration() internal returns (uint256) {
        substageDuration = (365 days * 1e18) / maxSubstage;
        //Todo We need to round down or down to the nearest value
        return substageDuration;
    }

    /////////////////////////////////////////////////////////////// Update Functions ///////////////////////////////////////////////////////////////

    /**
     * @dev Updates the token price per substage.
     */
    function updatePrice() internal returns (uint256) {
        substage storage substageInfo = SubstageInfo[stage][substage];
        substageInfo.priceIncrease = CalculateSubstagePrice();
        newPrice = previousPrice; //Todo previousPrice should be updated after each substage
        newPrice += substageInfo.priceIncrease;
        return newPrice;
    }

    /**
     * @dev Updates the token supply per substage.
     */
    function updateTokenSupply() internal returns (uint256) {
        substage storage substageInfo = SubstageInfo[stage][substage];
        substageInfo.SupplyIncrease = CalculateSubtageTokenIncrease();
        newTotalSupply = previousTotalSupply;
        newTotalSupply += substageInfo.SupplyIncrease;
        return newTotalSupply;
    }

    ////////////////////////////////////////////////////////////// Minting & Burning ///////////////////////////////////////////////////////////////

    /**
     * @notice Mints new tokens at the beginning of each substage.
     * @dev Can only be called internally by governance functions.
     */
    function mint(uint256 _amount) internal {
        require(_amount > 0, "Amount to burn should be greater than 0");
        uint256 prevSup = totalAssets();
        _mint(address(this), _amount);
        require(totalAssets() > prevSup, "Minting failed: Supply did not increase");
    }

    /**
     * @dev Burns tokens, callable only by the protocol via MULTISIG_ROLE.
     * @param _amount The amount of tokens to be burned.
     */
    function burn(uint256 _amount) public {
        //Todo Add onlyRole(MULTISIG_ROLE)
        require(_amount > 0, "Amount to burn should be greater than 0");
        _burn(address(this), _amount);
    }

    //////////////////////////////////////////////////////////////// Update Balance ////////////////////////////////////////////////////////////////

    /**
     * @dev Transfers balance from one holder to another.
     * @param _newHolder The new owner (aka buyer) of the balance.
     * @param _amount The amount of FIBO tokens being exchanged.
     * @param _listingId The id of the listing
     * @return The amount of tokens that have been transferred
     */
    function updateBalance(address _newHolder, uint256 _amount, uint256 _listingId) internal returns (uint256) {
        address currentHolder = market.listings[_listingId].holder;
        require(address(0) != (currentHolder && _newHolder), "Cannot transfer to or from zero address");
        require(_amount > 0, "Amount to transfer should be greater than 0");
        require(currentHolder != _newHolder, "Cannot transfer to yourself");
        require(market.listings[currentHolder][_listingId].amount >= _amount, "Holder doent have enough tokens to sell");
        FIBO._update(msg.sender, _newHolder, _amount);
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

    function getSubstagePrice() public view returns (uint256) {
        return substagePrice;
    }

    function getSubstageTokenIncrease() public view returns (uint256) {
        return substageTokenIncrease;
    }
}

//Store leftover tokens from the token distribution
//The protocol can retrieve them later
//We need to check if totalsupply - amountfor holders = amountstuck
//This amount will be sent the protocol's balance where they can sell them

//Old supply was 800,000 tokens
// new total supply is 1,000,000 // There is a 200,000 token increase
// If all the holders called getusertokens() the 200,000 will be distributed across all the holders
// After we round down all of the holders will receive 199,998.5 tokens

// Bob should receive 100.5 tokens -> 100 | 0.5
// Alice should receive 234.8 -> 234 | 0.8
//Tony shoud receive 232.2 -> 232 | 0.2
// ...
// 0.5 + 0.8 + 0.2 = 100 tokens unassigned tokens that we will need to assign them to the protocol or admin

// 10 tokens will be accessible to the protocol
