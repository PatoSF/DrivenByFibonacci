# EulerFi

![EulerFi Logo](https://github.com/user-attachments/assets/fe2b7e0b-44ca-4b42-bc2f-4ee89d0e532a)


## Driven By Fibonacci

EulerFi is a Decentralized Semi-Autonomous Hedge Fund designed to onboard both retail and institutional investors into DeFi while mitigating market volatility and irrational behavior.

## Overview

EulerFi functions as a blockchain-based pension plan, enabling investors to accumulate wealth through a risk-mitigated investment strategy. The protocol provides multiple layers of security, transparency, and trust through its unique assets and mechanisms.

## Key Assets

### Fibonacci ($FIBO)
- Endogenous ERC20 asset secured within an ERC4626 vault
- Designed for steady and predictable value appreciation
- Follows a unique model where value can only appreciate, independent of demand
- Protected from external price manipulation
- Holders can list tokens for sale at the stage-determined price

![FIBO Market Mechanism](https://github.com/user-attachments/assets/74cd881c-14b3-4492-8ac5-1c4daad0c2dd)


### Equilibrium ($EQLB)
- Semi-endogenous, collateralized stablecoin pegged at 1:1 ratio
- Backed by diversified asset pool (including stablecoins and $FIBO)
- Users can mint $EQLB by locking their $FIBO holdings
- Maintains a 1:1 collateral ratio without excessive collateralization or liquidation mechanisms
- Designed to be resilient against market shocks and single-asset failures

### FibonacciX ($FIBOX)
- Institutional-grade token for professional investors and institutions
- Features more gradual price and supply increases compared to $FIBO
- Functions as a governance token (preferred stock-like)
- Provides dividend earnings from protocol's fee-generated profits
- Holders can propose and vote through a zero-knowledge voting system

### Euler ($ELR)
- Standard ERC-20 token with fixed supply at each stage
- Entry mechanism for new buyers to join EulerFi
- Burned in exchange for $FIBO at a 1:1 ratio
- Functions as demand indicator for $FIBO

![ELR Market Mechanism](https://github.com/user-attachments/assets/69b31a77-127c-42ff-ba17-1579096ae2e6)


## Technical Architecture

EulerFi is deployed on Scroll L2 zkEVM, leveraging:
- FIBOVault, FIBOXVault, Buffer, and treasury systems
- Chainlink's CCIP for streamlined cross-chain investment
- Multi-Prover security with Automata Network's TEE Prover

## Investment Mechanism

1. Investors can purchase $FIBO directly from the protocol
2. $FIBO holders can list their tokens for sale at the stage-determined price
3. Buyers exchange approved tokens for $FIBO via the EulerFi marketplace
4. Smart contracts validate transactions using Chainlink's data feed
5. $FIBO remains locked in the protocol's vault, ensuring controlled appreciation

## Stability Framework

EulerFi's multi-layered stability approach includes:
- Diversified collateral pool for $EQLB
- Buffer system funded by $FIBOX revenue
- Strategic investment of surplus funds into income-generating assets
- Risk mitigation through acquisition of real-world assets (RWAs)

## Governance

$FIBOX holders govern the protocol through:
- Zero-knowledge voting system ensuring anonymity
- Data-driven proposal system for price and supply adjustments
- Focus on optimizing the protocol and maximizing value for all holders

## Future Development

- Expansion of cross-chain capabilities
- Further diversification of collateral assets

## Contact

For more information, contact:
- Patrick Sfeir: Patrick_sfeir@outlook.com
