// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC20, IERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC4626} from "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {TimelockController} from "@openzeppelin/contracts/governance/TimelockController.sol";
import {Euler} from "../Tokens/Euler.sol";
import {DataTypes} from "../Libraries/DataTypes.sol";
import {Events} from "../Libraries/Events.sol";
import {Errors} from "../Libraries/Errors.sol";
/**
* @title FIBO Vault 
* @author Team EulerFi
* @notice Standard ERC4626 vault with minting and burning capabilities
*/
contract FiboVault is ERC4626, Euler {
    IERC20 public Euler;
////////////////////////////////////////////////////////// Variables //////////////////////////////////////////////////////////
    uint256 public listingCounter;
    //stage incremented by setStage
    uint256 public stage;
    //Used to check if stage is bigger than currentstage in setSubstage()
    uint256 public currentstage;
    uint256 public substage;
    uint256 public maxsubstage;
    uint256 public price;
    uint256 public lastStageUpdate;
    uint256 public lastSubstageUpdate;
    uint256 public lastPriceUpdate;
    //address[] public ScrollAccessibleTokens; //Tokens accessible for users to swap for FIBO

    mapping (address => bool) public ScrollAccessibleTokens; //Tokens accessible for users to swap for FIBO

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

    mapping(address => uint256) public mintTimestamp;

    constructor(IERC20 _asset, IERC20 _Euler) ERC4626(_asset) { 
        Euler = _Euler;
    }

    /**
    * @notice Advances the stage, enforcing a 365-day delay.
    * @dev Only callable by EXECUTOR_ROLE.
    */
    function setStage() external onlyRole(EXECUTOR_ROLE) returns(uint256) {
        require(block.timestamp >= lastStageUpdate + 365 days, "Cannot advance stage before 365 days");
        stage += 1;
        lastStageUpdate = block.timestamp;
        emit StageUpdated(stage);
    }

    /**
    * @notice Updates the number of substages before transitioning to a new stage.
    * @dev Must be set before moving to the next stage.
    */
    /**
    //call the DAO contract to retrieve the number of substages and set it inside the contract in the mapping.
    //we should also keep track of the current substage.
    // Set the stages, substages info inside the registry
    */
    function setSubstage() external onlyRole(EXECUTOR_ROLE) returns(uint256) { 
        require(maxsubstage >= substage, "Substage must be maximum maxsubstage");
        require(block.timestamp >= lastSubstageUpdate + StageInfo[stage].substageDuration, "Substage duration not reached");
        if (currentstage < stage) {
            currentstage = stage;
            substage = 1;
        }
        else {
            substage += 1;
        }
        lastSubstageUpdate = block.timestamp;
        emit SubstageUpdated(substage);
        return substage;
    }

    /**
    * @notice Updates the token price per substage.
    * @dev Ensures the new price is greater than the previous price.
    */
    function setPrice(uint256 newPrice) external onlyRole(EXECUTOR_ROLE) returns (uint256) {
        require(newPrice > price, "New price must be higher");
        require(substage > 0, "Substage must be greater than zero"); // Added to avoid 0 check for substage
        require(substage > lastSubstageUpdate, "Price can only be updated per substage");
        price = newPrice / substage;
        lastSubstageUpdate = substage;
        lastPriceUpdate = block.timestamp;
        emit PriceUpdated(price);
        return price;
    }


///////////////////////////////////////////////////////// Minting & Burning /////////////////////////////////////////////////////////

    /**
    * @notice Mints new tokens at the beginning of each substage.
    * @dev Can only be called internally by governance functions.
    */
    function mint(uint256 _amount) internal onlyRole(MINTER_ROLE) {
        require(_amount > 0, "Amount to burn should be greater than 0");
        uint256 prevSupply = totalAssets();
        //Todo We need to put restrictions that will not allow MINTER_ROLE to mint more or less tokens in each substage
        //Todo We need to also check if substage period so he cannot mint before a substage or mint multiple times in a single substage
        uint256 prevSupply = totalAssets();
        _mint(address(this), _amount);
        require(totalAssets() > prevSupply, "Minting failed: Supply did not increase");
    }

    /**
    * @dev Burns tokens, callable only by the protocol via MULTISIG_ROLE.
    * @param amount The amount of tokens to be burned.
    */
    function burn(uint256 _amount) external onlyRole(MULTISIG_ROLE) {
        require(_amount > 0, "Amount to burn should be greater than 0");
        _burn(address(this), _amount);
    }

    /**
    * @dev Mints FIBO tokens for the Euler 
    * @param _amount The amount of FIBO tokens being minted
    */
    function mintFIBO4Euler(uint256 _amount) public {
        require(block.timestamp >= mintTimestamp[msg.sender] + 365 days, "Cannot swap Euler for FIBO before the next stage");
        require(_amount > 0, "Amount to burn should be greater than 0");
        Euler.burn(_amount);
        _mint(address(this), _amount);
        balance[msg.sender] += _amount;
        mintTimestamp[msg.sender] = block.timestamp;
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
        //Todo clear the tokens in the tokenlistings
        return _amount;
    }

//////////////////////////////////////////////////////////// List Tokens ///////////////////////////////////////////////////////////

    /**
     * @dev Lists tokens on the market
     * @param _amount The amount of FIBO tokens being listed.
     * @param _desiredTokens The address of the tokens being exchanged
     */
    function listTokens(uint256 _amount, address[] _desiredTokens) public {
        require(_amount > 0, "Amount to list should be greater than 0");
        require(balances[msg.sender] >= _amount, "Not enough balance");
        require(block.timestamp >= mintTimestamp[msg.sender] + StageInfo[stage].substageDuration, "Cannot list immediately after minting");
        listingCounter++;
        listingCounter.listings[listingCounter] = DataTypes.TokenListing({
            amount : _amount,
            holder : msg.sender,
            desiredTokens : _desiredToken,
            status : ListingStatus.Pending
        });
        emit TokensListed(listingCounter, msg.sender, amount, desiredToken[]);
    }

    /**
     * @notice When a Token listing is canceled inside listings,
     *         the listing detailed all become zero
     * @dev Remove a token from listings
     * @param listingId The Id of the listing
     */
    function removeListing(uint256 listingId) external {
        TokenListing storage listing = listings[listingId];
        require(msg.sender == listing.owner, "Only owner can remove listing");
        require(listing.amount > 0, "Listing does not exist");
        listingCounter.listings[listingCounter] = DataTypes.TokenListing({
            amount : 0,
            holder : delete holder,
            desiredTokens : delete desiredTokens,
            status : ListingStatus.Canceled
        });
        emit TokensListed(listingCounter, msg.sender, amount, desiredToken[]);
    }

    /**
     * @dev Adds an array of tokens to the list of tokens accessible for users to swap for FIBO
     */
    function addScrollTokens (address[] memory tokens) external onlyRole(PROTOCOL_ROLE) {
        for (uint256 i = 0; i < tokens.length; i++) {
            ScrollAccessibleTokens[tokens[i]] = true;
        }
    }

////////////////////////////////////////////////////////// View Funtions //////////////////////////////////////////////////////////

    /**
     * @dev Checks if a token is accessible for users to swap for FIBO
     */
    function checkScrollTokens (address token) external view returns (bool) {
        return ScrollAccessibleTokens[token];
    }
    
    /**
     * @notice Override the balanceOf function from the ERC20 contract
     * @dev Retrieves the balance of a holder
     * @param account address of the FIBO holder
     * @return the balance of FIBO for an address
     */
    function balanceOf(address account) public view override returns (uint256) {
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