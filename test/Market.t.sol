// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import "src/FIBO/Market.sol";
import "src/Tokens/Euler.sol";
import "src/Tokens/FIBO.sol";
import "src/FIBO/FIBOVaultV1.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ERC20Mock} from "@openzeppelin/contracts/mocks/token/ERC20Mock.sol";
contract MarketTest is Test {
    FiboVault public fiboVault;
    FIBO public fibo;
    Euler public EuLer;
    Market public market;
    ERC20Mock public token;
    address public immutable BOB = makeAddr("BOB");
    address public immutable ALICE = makeAddr("ALICE");
    address public immutable TONY = makeAddr("TONY");

    function setUp() public {
        fibo = new FIBO();
        EuLer = new Euler();
        fiboVault = new FiboVault(IERC20(address(fibo)),IERC20(address(EuLer)));
        token = new ERC20Mock();
        market = new Market(address(fiboVault));
        token.mint(BOB, 1000 ether);

        // Transfer ownership of the tokens to the vault.
        vm.prank(address(this));
        fibo.transferOwnership(address(fiboVault));

        vm.prank(address(this));
        EuLer.transferOwnership(address(fiboVault));

        // Mint some Euler tokens for testing.
        vm.prank(address(fiboVault));
        EuLer.mint(1000 ether);

        // Transfer some Euler tokens to Bob.
        vm.prank(address(fiboVault));
        EuLer.transfer(BOB, 500 ether);
    }

    function testListTokens() public {
      // Initialize the stage.
        vm.prank(address(fiboVault));
        fiboVault.initializeStage(12, 2, 1000 ether);

        // Let BOB mint some FIBO tokens via Euler swap.
        vm.startPrank(BOB);
        EuLer.approve(address(fiboVault), 50 ether);
        fiboVault.mintFIBO4Euler(50 ether);
        uint256 userFiboBalance = fibo.balanceOf(BOB);
        vm.stopPrank();

        uint256 newPrice = fiboVault.getPrice();
        uint256 expectedTotal = userFiboBalance * newPrice;

        vm.startPrank(BOB);
        uint256 totalBal = fiboVault.totalBalance();
        vm.stopPrank();
        assertEq(
            totalBal,
            expectedTotal,
            "Total balance should equal FIBO balance times newPrice"
        );

        console.log("Testtt1");
        address[] memory tokens = new address[](1);
        tokens[0] = address(token);
        address[] memory priceFeeds = new address[](1);
        priceFeeds[0] = 0xFadA8b0737D4A3AE7118918B7E69E689034c0127;
        market.addScrollTokens(tokens, priceFeeds);
        console.log("Testtt2");
        address[] memory desiredtoken = new address[](1);
        desiredtoken[0] = address(token);

        vm.startPrank(BOB);
        market.listTokens(1 ether, desiredtoken);
        vm.stopPrank();
     
    }

//     function testFailListTokensWithoutDeposit() public {
//         vm.startPrank(user1);
//         address[] memory desiredTokens = new address[](1);
//         desiredTokens[0] = address(usdc);
//         market.listTokens(100 ether, desiredTokens); // Should fail since no deposit
//         vm.stopPrank();
//     }

//     function testBuyFIBO() public {
//         testListTokens();
//         vm.startPrank(user2);
//         usdc.approve(address(market), 50 * 1e6);
//         market.buyFIBO(user1, 0, 50 ether, 50 * 1e6, address(usdc), 500); // 500 bps = 5% slippage
//         vm.stopPrank();
//     }

//     function testFailBuyFIBOWithHighSlippage() public {
//         testListTokens();
//         vm.startPrank(user2);
//         usdc.approve(address(market), 50 * 1e6);
//         market.buyFIBO(user1, 0, 50 ether, 50 * 1e6, address(usdc), 1); // 0.01% slippage too low
//         vm.stopPrank();
//     }

//     function testRemoveListing() public {
//         testListTokens();
//         vm.startPrank(user1);
//         market.removeListing(0);
//         vm.stopPrank();
//     }

//     function testFailRemoveListingUnauthorized() public {
//         testListTokens();
//         vm.startPrank(user2);
//         market.removeListing(0); // Should fail since not the owner
//         vm.stopPrank();
//     }
// }
}