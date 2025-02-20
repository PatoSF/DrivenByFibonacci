// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";

/// @title FIBO Vault 
/// @author Team EulerFi (visit https://eulerfi.com)
/// @dev Standard ERC4626 Vault that can mint locked ERC20 tokens

contract FiboVault is ERC20, ERC4626 {
    uint256 public stage;
    uint256 public substage; 
    uint256 public price;
    IERC20 public token;
    address[] public listedAddresses;
    mapping (address => uint256) public balance;
    mapping (address => mapping (address => uint256)) public amountlisted; 
    mapping (uint256 => mapping (uint256 => uint256[])) public SubstageInfo; 
    

/*
* ListTokens() using EIP-2612| List tokens on the market and specify which tokens he would like to exchange them with.
* 
**/
    
    function updatecurrentbalance()
        //it needs to calculate the new balance of the user
        //and the accumulated tokens he received
        //1000 
        //200
        //1200
        // 1M tokens 

    constructor() ERC4626(ERC20("Fibonacci", "FIBO"), "Fibonacci", "FIBO") {
        _mint(address(this), 1e9 * (10 ** 18)); // 1 Billion FIBO tokens
    }

    /*
    Setstage only increments the stage variable by 1 each year (365 days) from a stage to another.
    
    - As simple as it looks we need to implement a timelock controller using oz TimelockController
    - oz uses three different roles : PROPOSER_ROLE, EXECUTOR_ROLE, CANCELLER_ROLE
    - I didn't fully cover the oz contract but I believe we can specify one minimum delay or delay
    - In our contract we have multiple functions that have their own saperate delay period.
    - For example Setstage should always have a hardcoded delay of 365 days.
    - but the delay time when it comes to substages is dynamic.
    - For example : In stage 1 we might have 6 substages but in stage 2 we might have 8 substages.
    - So in stage 1 we will divide 12 months which is a full year by 6 and we get 2 months per substage.
    - In stage 2 we will divide 12 months which is a full year by 8 and we get 1.5 months per substage.
    - So per each stage we need to calculate the period of a substage that will be applied to all 
    - substages of that stage.
    - Going back to the SetStage(), you will need to override the timelock controller from oz to add
    - different types of delays. 
    - I believe to execute a task, first the proposer needs to propose and wait a period for it to get 
    - approved. Then the executor can execute the task.
    - Regarding the SetStage() and SetSubstage we won't need these roles to execute them. 
    - So we need to override the oz function to only be executed by the executor after the period has passed.
    - because in the DAO contract, the proposers can propose a number of proposals that will let 
    - the FIBOX holders vote on. After deciding on a number of substages for the next stage, 
    - the executor can call SetSubstage() to store the number of substages before the next stage starts.
    - We will create a IncreasePricePerSubstage() function and it will divide the total price increase 
    - per stage by the number of substages to get the price increase per substage.
    - 
    **/
    function SetStage() internal returns (uint256) {
        // Add a timelock using TimelockController for oz 
        stage += 1;
        return stage;
    }
    function SetSubstage() internal returns (uint256) {
        //call the DAO contract to retrieve the number of substages and set it inside the contract in the mapping.
        //we should also keep track of the current substage.
        // Set the stages, substages info inside the registry
    }
    

    /*
    Set the price increase at each substage 
    
    - If the DAO decided to only increase one of the the parameters or both :
        - 1. Total token supply 
        - 2. Price
    Then we will have an x = K (x being the supply increase) or y = K (y being the price increase) k being a constant.
    So if the price is 1 and we want to increase it to 3. So 3-1 = 2. y = 2 
    After we divide 2 by the number of substage for example 6 so 2 / 6 = 0.3333.
    So the price will increase by 0.3333 per substage. Same applies for the supply increase.
    - We we will have a big function that update the price in each substage and mint new tokens depending on the 
    - new amount of tokens chosen by the DAO. But before all of this, before the start of the next stage we need to make sure that
    - the new price and new total token supply agreed upon the DAO should be bigger then the previous total token supply and price.
    **/
    function SetPriceAndTokenSupply(uint256 newprice) external returns (uint256) {
        require (newprice > price, "New Price should be greater than oldPrice");
        newprice = newprice / substage; // We might need to account for rounding errors by multiplying first.
        price = newprice;
        return price;
    }

//////////////////////////////////////////////// Minting & Burning ////////////////////////////////////////////////
//IMPORTANT 
/** 
* @notice When minting or burning tokens, we need to use a token distribution mechanism to distribute the tokens proportionally.
          We will need to create a function for them to call to see how many tokens they got from a stage to another and from
          a substage to another. 
* @notice We will also need to create a funtion that calculates their total balance * the price of the FIBO so they can get
          the total worth of their balance.
* @notice If they want to list their tokens for sale : If they decide to sell all their tokens, they will choose "List All" button
          on the frontend so we will a boolean or uint2 (if its 1 that means sell all or else its 0 that means they will specify 
          the amount) they want to sell.
*/
    /*
    - mint() function is an internal function and should only be called by SetPriceAndTokenSupply(). 
    - At the start of each substage. 
    - This functions isn't finished, it needs a lot of restrictions. They can be added in the SetPriceAndTokenSupply(). 
    **/
    function mint(uint256 amount) internal returns (uint256) { 
        _mint(address(this), amount);
        return amount;
    }

    /*
    - The burning function can only be called by the Protocol. Even the DAO cannot control this function.
    - We will use a multisig to call this function.
    **/
    function burn(uint256 amount) external {
        require(amount > 0, "Amount to burn should be greater than 0");
        _burn(address(this), amount);
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
- UpdateBalance(currentHolder, newHolder, amount) should be used to update the address of the buyer and the address of the seller
- after the transaction has occured in the market contract.
- For example the balance of Alice aka the buyer will get updated here similarly to the seller.
- In the market contract Alice will send the $SCR tokens of Bob to a MarketVault that has basic functionalities 
- The MarketVault has a withdraw function and an internal deposit function that will be called by the market contract.
- In the MarketVault we can use a double mapping : mapping (address => mapping (address[] => uint256)) public balance; 
- The seller can see which tokens he has in the MarketVault and the value of each one and can procceed to sell all of this 
- at the same time using a for loop.
*/

    /**
    * @notice Updates the balance of a user
    * @dev Transfers `amount` tokens from `currentHolder` to `newHolder`.
    * @param currentHolder the address that owns the tokens
    * @param newHolder the address that will receive the tokens
    * @param amount the amount of tokens to transfer
    * @return the amount of tokens that have been transferred
    */
    function UpdateBalance(address currentHolder, address newHolder, uint256 amount) internal returns (uint256) {
        require(amount > 0, "Amount to transfer should be greater than 0");
        require(balance[currentHolder] >= amount, "Not enough balance");
        // The amount that can be transfered should be listed first
        require(amountlisted[currentHolder][address(token)] >= amount, "Not enough balance");
        balance[currentHolder] = balance[currentHolder] - amount; 
        balance[newHolder] += amount;
        return amount;
    }
    // If Bob has 1000 tokens and he want to sell 400 tokens 
    // from the 1000 tokens only 400 tokens are allegible to be sold 


////////////////////////////////////////////////////////// View Funtions //////////////////////////////////////////////////////////
  
   /**
     * @dev Returns the name of the token.
     */
    function name() public view override returns (string memory) {
        return ERC20.name();
    }

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() public view override returns (string memory) {
        return ERC20.symbol();
    }

    /**
    * @dev Decimals are computed by adding the decimal offset on top of the underlying asset's decimals. This
    * "original" value is cached during construction of the vault contract. If this read operation fails (e.g., the
    * asset has not been created yet), a default of 18 is used to represent the underlying asset's decimals.
    *
    * See {IERC20Metadata-decimals}.
    */
    function decimals() public view override returns (uint8) {
    // You can choose to return the decimals from either ERC20 or ERC4626
    // For example, return ERC20.decimals();
        return ERC20.decimals();
    }

    /**
    * @notice We can also use balanceOf(address(this)) 
    * @dev Returns the total amount of the FIBO tokens that is “managed” by Vault.
    * @return the current total FIBO supply
    * - SHOULD include any compounding that occurs from yield.
    * - MUST be inclusive of any fees that are charged against assets in the Vault.
    * - MUST NOT revert.
    */
    function totalAssets() public view override returns (uint256) {
        return ERC20.totalSupply();
    }

    /**
    * @notice function from the ERC20 contract
    * @dev Retrieves the balance of each user
    * @return the balance of FIBO for an address
    */
    function HolderBalance(address account) public view returns (uint256) {
        return balance[account];
    }

}




   struct TokenData {
        uint256 price;
        uint256 totalSupply;
    }

    mapping(bytes32 tokenSymbolHash => mapping(uint256 stage => mapping(uint256 subStage => TokenData))) private
        tokenSymbolHashToStageToSubstageToTokenData;





    uint256 public stage;
    uint256 public substage;
    uint256 public price;
    IERC20 public token;
    address[] public listedAddresses;
    mapping (address => uint256) public balance;
    mapping (address => mapping (address => uint256)) public amountlisted; 
    mapping (uint256 => mapping (uint256 => uint256[])) public SubstageInfo; 



    input the address of a user -> it will let us see what are all the erc20 tokens
    that the user is currently listing -> amount
    mapping (address => address[] => uint256) public tokens;
    mapping (address => mapping (address => uint256)) public amountlisted; 

    bob has 1000 tokens
    the first 200 tokens, he wants to exchange them with SCR
    the other 300 // // // UNI

    1000 | 200 | SCR | success 
          | 400 | UNI 
          | 200 | HBAR
    ... 


    struct TokenBalance {
        address tokenAddress;
        uint256 balance;
    }
    mapping(address user => TokenBalance[]) public userBalances;



    