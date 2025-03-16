import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import useContractInstance from "../setup/useContractInstance";
import { useCallback } from "react";
import { toast } from "sonner";
import { scrollSepolia } from "@reown/appkit/networks";
import { EquilibriumEngine } from "@/constant/contractAddresses";
import EqblABI from "../../constant/abis/EquilibriumEngineAbi.json";

const useMintEqbl = () => {
  const contract = useContractInstance(true, EquilibriumEngine, EqblABI);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

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
        const adjustedAmount = BigInt(Math.floor(amount * 10 ** 18));

        const tx = await contract.mintequilibrium(adjustedAmount);

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
    [address, chainId, contract]
  );
};

export default useMintEqbl;
