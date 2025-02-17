//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Factory.sol";
import "@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Pair.sol";

contract FiboVault is ERC4626 {
    // a mapping that checks if a user has deposited the token
    mapping(address => uint256) public shareHolder;

    address public owner;
    IUniswapV2Router02 public dexRouter;
    address public lpToken;

    event LiquidityAdded(uint256 tokenAmount, uint256 ethAmount);
    event LiquidityRemoved(uint256 lpTokenAmount, uint256 tokenAmount, uint256 ethAmount);


    constructor(
        ERC20 _asset,
        string memory _name,
        string memory _symbol,
        address _dexRouter
    ) ERC4626(_asset, _name, _symbol) {
        owner = msg.sender;
        dexRouter = IUniswapV2Router02(_dexRouter);
        address factory = dexRouter.factory();
        lpToken = IUniswapV2Factory(factory).getPair(address(asset), dexRouter.WETH());
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }


    /**
     * @notice function to deposit assets and receive vault tokens in exchange
     * @param _assets amount of the asset token
     */
    function _deposit(uint _assets) public {
        require(_assets > 0, "Deposit less than Zero");
        deposit(_assets, msg.sender);
        // Increase the share of the user
        shareHolder[msg.sender] += _assets;
    }

    /**
     * @notice Function to allow msg.sender to withdraw their deposit plus accrued interest
     * @param _shares amount of shares the user wants to convert
     * @param _receiver address of the user who will receive the assets
     */
    function _withdraw(uint _shares, address _receiver) public {
        require(_shares > 0, "withdraw must be greater than Zero");
        require(_receiver != address(0), "Zero Address");
        require(shareHolder[msg.sender] > 0, "Not a share holder");
        // checks that the caller has more shares than they are trying to withdraw.
        require(shareHolder[msg.sender] >= _shares, "Not enough shares");
        // Calculate 10% yield on the withdrawal amount
        uint256 percent = (10 * _shares) / 100;
        // Calculate the total asset amount as the sum of the share amount plus 10% of the share amount.
        uint256 assets = _shares + percent;
        redeem(assets, _receiver, msg.sender);
        // Decrease the share of the user
        shareHolder[msg.sender] -= _shares;
    }

    // returns total number of assets
    function totalAssets() public view override returns (uint256) {
        return asset.balanceOf(address(this));
    }

    // returns total balance of user
    function totalAssetsOfUser(address _user) public view returns (uint256) {
        return asset.balanceOf(_user);
    }

    // Listing tokens on uniswap
    function listOnDex(uint256 tokenAmount, uint256 ethAmount) external onlyOwner {
        require(tokenAmount > 0 && ethAmount > 0, "Invalid amounts");
        require(asset.balanceOf(address(this)) >= tokenAmount, "Insufficient tokens");
        
        asset.approve(address(dexRouter), tokenAmount);
        
        dexRouter.addLiquidityETH{value: ethAmount}(
            address(asset),
            tokenAmount,
            0, 
            0, 
            owner,
            block.timestamp + 300 
        );

        emit LiquidityAdded(tokenAmount, ethAmount);
    }

    // Delist tokens from uniswap
    function withdrawLiquidity(uint256 lpTokenAmount) external onlyOwner {
        require(lpTokenAmount > 0, "Invalid LP token amount");
        require(IERC20(lpToken).balanceOf(address(this)) >= lpTokenAmount, "Insufficient LP tokens");
        
        IERC20(lpToken).approve(address(dexRouter), lpTokenAmount);
        
        (uint256 amountToken, uint256 amountETH) = dexRouter.removeLiquidityETH(
            address(asset),
            lpTokenAmount,
            0,
            0,
            owner,
            block.timestamp + 300
        );

        emit LiquidityRemoved(lpTokenAmount, amountToken, amountETH);
    }

    // After Liquidity removal from DEX if owner wants to claim all eth and vault tokens he can do so by manually calling below functions
    function withdrawAllVaultTokens() external onlyOwner {
        uint256 vaultBalance = asset.balanceOf(address(this));
        require(vaultBalance > 0, "No vault tokens to withdraw");
        asset.transfer(owner, vaultBalance);
    }

    function withdrawETH() external onlyOwner {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No ETH to withdraw");
        payable(owner).transfer(contractBalance);
    }

    receive() external payable {}
}