import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import useContractInstance from "../setup/useContractInstance";
import { useCallback } from "react";
import { toast } from "sonner";
import { scrollSepolia } from "@reown/appkit/networks";
import { EquilibriumEngine } from "@/constant/contractAddresses";
import { Contract } from "ethers";
import useSignerOrProvider from "../setup/useSignerOrProvider";
import EqblABI from "../../constant/abis/EquilibriumEngineAbi.json";

type TokenType = {
  name: string;
  symbol: string;
  address: string;
  image: string;
};

export const ERC20ApproveABI = [
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
];

const useDepositCollateral = () => {
  const contract = useContractInstance(true, EquilibriumEngine, EqblABI);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  const { signer } = useSignerOrProvider();

  return useCallback(
    async (token: TokenType, colAmount: number) => {
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
        const decimals = token.symbol === "USDC" ? 6 : 18; // Adjust based on token
        const adjustedColAmount = BigInt(
          Math.floor(colAmount * 10 ** decimals)
        );

        // First approving the contract to spend the token
        const approveTx = await ERC20Contract.approve(
          EquilibriumEngine,
          adjustedColAmount
        );
        await approveTx.wait();

        //After approval of the token, depositing the token

        const tx = await contract.depositCollateral(
          token.address,
          adjustedColAmount
        );

        const receipt = await tx.wait();
        console.log(receipt);

        if (receipt.status === 1) {
          toast.success("Successfully deposited collateral");
          return;
        }

        toast.error("Failed to deposit collateral");
        return;
      } catch (error) {
        console.error("Error from depositing collateral", error);
      }
    },
    [address, chainId, contract, signer]
  );
};

export default useDepositCollateral;
