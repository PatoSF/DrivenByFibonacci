

import useContractInstance from "../setup/useContractInstance";
import { useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import { useCallback } from "react";
import { toast } from "sonner";
import { scrollSepolia } from "@reown/appkit/networks";
import { VaultAddress } from "@/constant/contractAddresses";
import VaultABI from "@/constant/abis/VaultAbi.json";

/**
 * Hook to mint FIBO for Euler
 *
 * @param contractAddress - The address of the contract
 * @param ABI - The ABI of the contract
 * @returns A function that takes the amount of FIBO to mint as an argument and
 *          returns a Promise that resolves to nothing if the mint was successful,
 *          or rejects with an error if the mint failed.
 */
const useMintFibo4Euler = () => {
  const contract = useContractInstance(true, VaultAddress, VaultABI);
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  return useCallback(
    async (amount: number) => {
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

      if (
        Number(chainId) !== Number(scrollSepolia.id)
      ) {
        toast.error("You're on the wrong network");
        return;
      }

      try {


        const tx = await contract.mintFIBO4Euler(BigInt(amount*1e18));

        const receipt = await tx.wait();
        console.log(receipt);
        

        if (receipt.status === 1) {
          toast.success("Successfully minted FIBO for Euler");
          return;
        }

        toast.error("Failed to mint");
        return;
      } catch (error) {
        console.error("Error from creating todo", error);
      }
    },
    [address, chainId, contract]
  );
};

export default useMintFibo4Euler;
