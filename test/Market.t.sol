// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import "src/FIBO/Market.sol";
import "src/Tokens/Euler.sol";
import "src/Tokens/FIBO.sol";
import "src/FIBO/FIBOVaultV1.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";
import {MockPriceFeed} from "./Mocks/MockPriceFeed.sol";

contract MarketTest is Test {
    FiboVault public fiboVault;
    FIBO public fibo;
    Euler public EuLer;
    Market public market;
    ERC20Mock public token;
    MockPriceFeed public priceFeed;

    address public immutable BOB = makeAddr("BOB");
    address public immutable ALICE = makeAddr("ALICE");

    function setUp() public {
        fibo = new FIBO();
        EuLer = new Euler();
        fiboVault = new FiboVault(IERC20(address(fibo)), IERC20(address(EuLer)));
        token = new ERC20Mock();
        market = new Market(address(fiboVault));
        token.mint(BOB, 1000 ether);

        // Deploy a mock Chainlink price feed with a price of $2000
        priceFeed = new MockPriceFeed(2000 * 1e8);

        // Transfer ownership of the tokens to the vault.
        vm.prank(address(this));
        fibo.transferOwnership(address(fiboVault));

        vm.prank(address(this));
        EuLer.transferOwnership(address(fiboVault));

        // Mint some Euler tokens for testing.
        vm.prank(address(fiboVault));
        EuLer.mint(1000 ether);

        vm.prank(address(fiboVault));
        fibo.mint(1000 ether);

        // Mint some Euler tokens to Bob.
        vm.prank(address(BOB));
        EuLer.mint(500 ether);

        vm.prank(address(BOB));
        fibo.mint(500 ether);
    }

    function testListTokens() public {
        vm.prank(address(fiboVault));
        fiboVault.initializeStage(12, 2, 1000 ether);

        vm.startPrank(BOB);
        EuLer.approve(address(fiboVault), 50 ether);
        fiboVault.mintFIBO4Euler(50 ether);

        // Add a supported token and its price feed to the Market
        address[] memory tokens_ = new address[](1);
        tokens_[0] = address(token);
        address[] memory priceFeeds_ = new address[](1);
        priceFeeds_[0] = address(priceFeed);
        market.addScrollTokens(tokens_, priceFeeds_);

        // BOB lists FIBO tokens for sale with the desired token being "token"
        address[] memory desiredTokens = new address[](1);
        desiredTokens[0] = address(token);

        market.listTokens(1 ether, desiredTokens);
        vm.stopPrank();

        // Verify the listing details
        DataTypes.TokenListing memory tokenListing = market.getListing(1);
        assertEq(tokenListing.amount, 1 ether, "Listed amount mismatch");
        assertEq(tokenListing.desiredToken[0], address(token), "Desired token mismatch");
    }

    // function testBuyFIBO() public {
    //     testListTokens();
    //     vm.startPrank(ALICE);
    //     token.mint(ALICE, 1000 ether);

    //     token.approve(address(market), 1000 ether);
    //     market.BuyFIBO(BOB, 1, 1, 1 ether, address(token), 500);
    //     vm.stopPrank();

    //     // Verify that the listing has been updated (fully purchased)
    //     DataTypes.TokenListing memory tokenListing = market.getListing(1);
    //     assertEq(tokenListing.amount, 0, "Remaining listing should be 0 after full purchase");
    // }

    // function testFailBuyFIBOWithHighSlippage() public {
    //     testListTokens();

    //     vm.startPrank(BOB);
    //     token.mint(BOB, 2 ether);
    //     token.approve(address(market), 1 ether);
    //     // Expect failure due to slippage being set too low
    //     market.BuyFIBO(BOB, 1, 1 ether, 1 ether, address(token), 1);
    //     vm.stopPrank();
    // }

    // function testRemoveListing() public {
    //     testListTokens();

    //     vm.startPrank(BOB);
    //     market.removeListing(1);
    //     vm.stopPrank();

    //     // After removal, the listing amount should be 0
    //     DataTypes.TokenListing memory tokenListing = market.getListing(1);
    //     assertEq(tokenListing.amount, 0, "Listing should be removed");
    // }

    // function testFailRemoveListingUnauthorized() public {
    //     testListTokens();
    //     vm.startPrank(ALICE);
    //     market.removeListing(1);
    //     vm.stopPrank();
    // }
}