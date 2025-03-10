// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "src/FIBO/FIBOVaultV1.sol";
import "src/Tokens/Euler.sol";
import "src/Tokens/FIBO.sol";
import "src/Libraries/DataTypes.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FiboVaultTest is Test {
    FiboVault public fiboVault;
    FIBO public fibo;
    Euler public EuLer;
    address public immutable BOB = makeAddr("BOB");
    address public immutable ALICE = makeAddr("ALICE");
    address public immutable TONY = makeAddr("TONY");

  function setUp() public {
        fibo = new FIBO();
        EuLer = new Euler();
        fiboVault = new FiboVault(
            IERC20(address(fibo)),
            IERC20(address(EuLer))
        );

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

    function testInitializeStage() public {
        vm.startPrank(address(fiboVault));
        fiboVault.initializeStage(12, 2, 1000 ether);
        assertEq(fiboVault.getStage(), 1);
        (
            uint256 price,
            uint256 artificialSupply,
            uint256 maxSubstage,
            uint256 substageDuration
        ) = fiboVault.StageInfo(1);
        assertEq(artificialSupply, 1000 ether);
        vm.stopPrank();
    }
      function testMintFIBO4Euler() public {
        vm.startPrank(BOB);

        EuLer.approve(address(fiboVault), 50 ether);

        fiboVault.mintFIBO4Euler(50 ether);

        assertEq(fibo.balanceOf(BOB), 50 ether);
        vm.stopPrank();
    }

    function testGetUserTokensCalculatesCorrectly() public {
        // Initialize the stage.
        vm.startPrank(address(fiboVault));
        fiboVault.initializeStage(12, 2, 1000 ether);
        vm.stopPrank();

        // Mint FIBO for Euler.
        vm.startPrank(BOB);
        EuLer.approve(address(fiboVault), 50 ether);
        fiboVault.mintFIBO4Euler(50 ether);
        vm.stopPrank();

        // Progress to the next substage so that the previous total supply becomes nonzero.
        vm.startPrank(address(fiboVault));
        uint256 newSubstage = fiboVault.updateSubstage();
        vm.stopPrank();

        (, , uint256 prevTotalSupply) = fiboVault.PreviousInfo(1, newSubstage);
        uint256 currentTotalSupply = fibo.totalSupply();
        uint256 incrementInTotalSupply = currentTotalSupply - prevTotalSupply;
        uint256 bobFiboBalance = fibo.balanceOf(BOB);

        // Expected tokens to send based on getUserTokens formula.
        uint256 expectedTokensToSend = (bobFiboBalance *
            incrementInTotalSupply *
            1e18) / prevTotalSupply;

        vm.startPrank(BOB);
        uint256 tokensSent = fiboVault.getUserTokens();
        vm.stopPrank();

        assertEq(
            tokensSent,
            expectedTokensToSend,
            "getUserTokens() returned an unexpected value"
        );
    }
    function testTotalBalance() public {
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
    }
    function testCalculateSubstagePrice() public {
        vm.prank(address(fiboVault));
        fiboVault.initializeStage(12, 2, 1000 ether);

        uint256 calculatedPrice = fiboVault.CalculateSubstagePrice();
        uint256 numerator = 2 * 1e18;
        uint256 expectedPrice = numerator / 12;
        assertEq(
            calculatedPrice,
            expectedPrice,
            "Calculated substage price is incorrect"
        );
    }
    function testUpdateBalance() public {
        // Mint some FIBO tokens for BOB first via Euler swap.
        vm.startPrank(BOB);
        EuLer.approve(address(fiboVault), 100 ether);
        fiboVault.mintFIBO4Euler(100 ether);
        vm.stopPrank();
        assertEq(fibo.balanceOf(BOB), 100 ether);
        
        vm.prank(address(fiboVault));
        uint256 transferred = fiboVault.updateBalance(BOB, ALICE, 40 ether);
        assertEq(transferred, 40 ether, "Transferred amount should be 40 ether");
        
        // Verify that BOB's balance decreases and ALICE's increases.
        assertEq(fibo.balanceOf(BOB), 60 ether, "BOB should have 60 ether after transfer");
        assertEq(fibo.balanceOf(ALICE), 40 ether, "ALICE should have 40 ether after transfer");
    }
    
    function testGetStageAndSubstage() public {
        vm.prank(address(fiboVault));
        fiboVault.initializeStage(12, 2, 1000 ether);

        uint256 stage = fiboVault.getStage();
        uint256 substage = fiboVault.getSubstage();
        assertEq(stage, 1, "Stage should be 1 after initialization");

        assertEq(substage, 1, "Substage should be 1 after initialization");
    }
    function testGetSubstagePrice() public {
        vm.prank(address(fiboVault));
        fiboVault.initializeStage(12, 2, 1000 ether);

        uint256 numerator = 2 * 1e18;
        uint256 expectedSubstagePrice = numerator / 12;
        uint256 storedPrice = fiboVault.getPrice();
        assertEq(
            storedPrice,
            expectedSubstagePrice,
            "Substage price should be calculated correctly"
        );
    }
}