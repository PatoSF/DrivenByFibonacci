// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import {DataTypes} from "../Libraries/DataTypes.sol";
import {Events} from "../Libraries/Events.sol";
/**
* @title FIBO Vault 
* @author Team EulerFi
* @notice Standard ERC4626 vault with minting and burning capabilities
*/
contract FiboVault is ERC4626 {
    uint256 public listingCounter;
    //stage incremented by setStage
    uint256 public stage;
    //Used to check if stage is bigger than currentstage in setSubstage()
    uint256 public currentstage;
    uint256 public substage;
    uint256 public maxsubstage;
    uint256 public price;

////////////////////////////////////////////////////////// Mappings //////////////////////////////////////////////////////////
    /**
    * @notice Tracks stage Information
    * @dev Return a struct with total substages, substage duration, total price increase and total supply increase
    */
    mapping (uint256 => DataTypes.Stage[]) public StageInfo;

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
     mapping(uint256 => DataTypes.TokenListing[]) public listings;
    //N The mapping was a double mapping but I changedd it to a single mapping that will take the listingId
    // because I optimized the updatebalance function so it can get the owner of a listing from the struct.
    // mapping(address => mapping(uint256 => DataTypes.TokenListing[])) public listings;

    constructor(IERC20 _asset) ERC4626(_asset) { 

    }




    /**
    * @notice Advances the stage, enforcing a 365-day delay.
    * @dev Only callable by EXECUTOR_ROLE.
    */
    function setStage() external onlyRole(EXECUTOR_ROLE) returns(uint256) {
        //N Add a require statement to check if 365 days has passed this the last call
        stage += 1;
        return stage;
        //N use emit instead of return 
    }

    /**
    * @notice Updates the number of substages before transitioning to a new stage.
    * @dev Must be set before moving to the next stage.
    */
    function setSubstage() external onlyRole(EXECUTOR_ROLE) returns(uint256) { 
        require(maxsubstage >= substage, "Substage must be maximum maxsubstage");
         //N Add a require statement to check if the duration since the start of the previous
         // substage has passed or at the start of the Stage.
        if (currentstage < stage) {
            currentstage = stage;
            substage = 1;
        }
        else {
            substage += 1;
        }
        return substage;
    }

    /**
    * @notice Updates the token price per substage.
    * @dev Ensures the new price is greater than the previous price.
    */
    function setPrice(uint256 newPrice) external onlyRole(EXECUTOR_ROLE) returns (uint256) {
        require(newPrice > price, "New price must be higher");
        require(substage > 0, "Substage must be greater than zero"); // Added to avoid 0 check for substage
        price = newPrice / substage; //N apply multiplication to account for rounding errors maybe 10e18 idk
        return price;
    }


///////////////////////////////////////////////////////// Minting & Burning /////////////////////////////////////////////////////////

    /**
    * @notice Mints new tokens at the beginning of each substage.
    * @dev Can only be called internally by governance functions.
    */
    function mint(uint256 amount) internal onlyRole(MINTER_ROLE) {
        //N We need to put restrictions that will not allow MINTER_ROLE to mint more or less tokens in each substage
        //N We need to also check if substage period so he cannot mint before a substage or mint multiple times in a single substage
        uint256 prevSupply = totalAssets();
        _mint(address(this), amount);
        require(totalAssets() > prevSupply, "Minting failed: Supply did not increase");
    }

    /**
    * @notice Burns tokens, callable only by the protocol via MULTISIG_ROLE.
    */
    function burn(uint256 amount) external onlyRole(MULTISIG_ROLE) {
        require(amount > 0, "Amount to burn should be greater than 0");
        _burn(address(this), amount);
    }

////////////////////////////////////////////////////////// Update Balance /////////////////////////////////////////////////////////

    /**
     * @dev Transfers balance from one holder to another.
     * @param newHolder The new owner (aka buyer) of the balance.
     * @param _amount The amount of FIBO tokens being exchanged.
     * @param _listingId The id of the listing
     * @return The amount of tokens that have been transferred
     */
    function updateBalance(address newHolder, uint256 _amount, uint256 _listingId) internal returns (uint256) {
        address currentHolder = listings[_listingId].holder;
        // currentHolder and newHolder cannot be the zero address
        require(address(0) != (currentHolder && newHolder), "Cannot transfer to or from zero address");
        // amount must be greater than 0
        require(_amount > 0, "Amount to transfer should be greater than 0");
        // currentHolder cannot be the same as newHolder
        require (currentHolder != newHolder, "Cannot transfer to yourself");
        // The currentHolder must list his tokens on the market before calling the updateBalance
        // and the seller can buy maximum the amount of tokens that the holder has listed
        uint256 amount = listings[currentHolder][_listingId].amount;
        require(amount >= _amount, "Holder doent have enough tokens to sell");
        balances[currentHolder] -= _amount;
        balances[newHolder] += _amount;
        //N clear the tokens in the tokenlistings
        return _amount;
    }

//////////////////////////////////////////////////////////// List Tokens ///////////////////////////////////////////////////////////




////////////////////////////////////////////////////////// View Funtions //////////////////////////////////////////////////////////

    /**
     * @dev Returns the address of the underlying token used for the Vault for accounting, depositing, and withdrawing.
     *
     * - MUST be an ERC-20 token contract.
     * - MUST NOT revert.
     */
    function asset() public view override returns (address) {
        return address(_asset);
    }

    /**
     * @dev Returns the total amount of the underlying asset that is “managed” by Vault.
     *
     * - SHOULD include any compounding that occurs from yield.
     * - MUST be inclusive of any fees that are charged against assets in the Vault.
     * - MUST NOT revert.
     */
    function totalAssets() public view override returns (uint256) {
        return _asset.balanceOf(address(this));
    }

    /**
     * @notice Override the balanceOf function from the ERC20 contract
     * @dev Should retrieve the balance of each user
     * @param account address of the FIBO holder
     * @return the balance of FIBO for an address
     */
    function holderBalance(address account) public view returns (uint256) {
        return balances[account];
    }


    /**
     * @dev Returns information about one listing
     * @param _listingId Id of a specific listingS
     * @return Returns a struct containing the holder, the amount and the desired tokens
     */
    function getListing(uint256 _listingId) public view returns (DataTypes.TokenListing memory) {
        return listings[_listingId]; 
    }

    /**
     * @dev Returns information about all the listings of a user
     * @return Returns an array of structs containing the holder, the amount and the desired tokens
     *
     * It won't work since we changedd the listings to a single mapping. We can only put the listingId 
     * to retrieve the information about it and the holder.
     * Since we are updating the hodler's listing dashboard everytime he lists or cancels his listing token, we won't be needing this function
     * Also we will update his dashboard everytime his tokens are sold. So we will have a enum : Pending, Sold, Canceled. He can filter 
     * them in the frontend and hide the canceled ones if he wants to. (GO TO COMMENTS BELOW TO READ MORE ON THIS (Section 2))
     */
    // function getAllListings(address user) public view returns (DataTypes.TokenListing[] memory) {
    //     return listings[user]; // Returns all listings
    // }

}

////////////////////////////////////////////////////////// Comments //////////////////////////////////////////////////////////
// Everytime the user lists his tokens -> he will update his dashboard 
// Everytime a buyer buys his tokens -> he will update his dashboard



// When a new buyer buys FIBO tokens they should wait a minimum amount before listing his tokens 
// this will eliminate an MEV opportunities for quick money.
//N we need to implement this inside the listtokens function



// currentHolder must have enough balance
//require(balance[currentHolder] >= _amount, "Not enough balance");
//We need to check the currentHolder's balance before he can list his tokens
// So we can see if he has enough balance to list his tokens

/**
Section 2 
We will need to create a priority system using a FIFO (First in First out) approach
example : 
Bob has listed 1000 tokens on 1 January.
Alice has listed 2000 tokens on 5 January.
Tony has listed 500 tokens on 9 January.

When a buyer wants to buy FIBO tokens in exchange for $SCR :
     He will use the filter on the dashboard to see which FIBO tokens are available for sale in exchange for $SCR.
     We will display all the Holders who are interested in getting $SCR for their FIBO tokens.
     If Noir wants to buy 800 tokens, he will buy it from Bob. Since bob was the first to list,
     he will be the first to sell. But if the buyer wants 1500 tokens, he will buy the first 1000 tokens from Bob and rest from Alice.
     Alice will have 1500 tokens left that she can sell.
*/

    
