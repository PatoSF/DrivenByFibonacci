contract FiboVault is ERC20, ERC4626 {
    address[] public listedAddresses;
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


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
