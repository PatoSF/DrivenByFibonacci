import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import useContractInstance from "../setup/useContractInstance";
import { useCallback } from "react";
import { toast } from "sonner";
import { scrollSepolia } from "@reown/appkit/networks";
import { EquilibriumEngine } from "@/constant/contractAddresses";
import { Contract } from "ethers";
import useSignerOrProvider from "../setup/useSignerOrProvider";

type TokenType = {
  name: string;
  symbol: string;
  address: string;
  image: string;
};

const ERC20ApproveABI = [
  {
    constant: false,
    inputs: [
      {
        name: "spender",
        type: "address",
      },
      {
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        name: "",
        type: "bool",
      },
    ],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    type: "function",
  },
];

const useDepositAndMint = () => {
  const contract = useContractInstance(true, EquilibriumEngine, ABI);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  const { signer } = useSignerOrProvider();

  return useCallback(
    async (token: TokenType, colAmount: number, amount: number) => {
      if (colAmount < 1) {
        toast.error("Amount is too small");
        return;
      }
      if (amount < 1) {
        toast.error("Amount is too small");
        return;
      }

      if (!address) {
        toast.error("Please connect your wallet");
        return;
      }

      if (!contract) {
        toast.error("Contract not found");
        return;
      }

      if (Number(chainId) !== Number(scrollSepolia.id)) {
        toast.error("You're on the wrong network");
        return;
      }

      if (token.address === "") {
        toast.error("Please select a token");
        return;
      }

      const ERC20Contract = new Contract(
        token.address,
        ERC20ApproveABI,
        signer
      );

      try {
        //Retrieve token decimals
        const decimals = await ERC20Contract.decimals();
        const adjustedColAmount = BigInt(colAmount * 10 ** decimals);

        // First approving the contract to spend the token
        const approveTx = await ERC20Contract.approve(
          EquilibriumEngine,
          adjustedColAmount
        );
        await approveTx.wait();

        //After approval of the token, depositing the token

        const tx = await contract.depositCollateralAndMintequilibrium(
          token.address,
          adjustedColAmount,
          BigInt(amount * 1e18)
        );

        const receipt = await tx.wait();
        console.log(receipt);

        if (receipt.status === 1) {
          toast.success("Successfully deposited collateral and minted EQBL");
          return;
        }

        toast.error("Failed to mint EQBL");
        return;
      } catch (error) {
        console.error("Error from minting EQBL", error);
      }
    },
    [address, chainId, contract, signer]
  );
};

export default useDepositAndMint;
