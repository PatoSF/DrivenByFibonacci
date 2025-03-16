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

const useMintEqbl = () => {
  const contract = useContractInstance(true, EquilibriumEngine, EqblABI);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  const { signer } = useSignerOrProvider();

  return useCallback(
    async (amount: number) => {
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

      try {
        const adjustedColAmount = BigInt(Math.floor(amount * 10 ** 18));

        const tx = await contract.mintequilibrium(adjustedColAmount);

        const receipt = await tx.wait();
        console.log(receipt);

        if (receipt.status === 1) {
          toast.success("Successfully minted EQBL");
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

export default useMintEqbl;
