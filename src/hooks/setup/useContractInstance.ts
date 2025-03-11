import { useMemo } from "react";
import useSignerOrProvider from "./useSignerOrProvider";
import { Contract, InterfaceAbi } from "ethers";

/**
 * Hook to create an ethers Contract instance.
 *
 * If `withSigner` is true, the hook will return a Contract instance connected to the signer.
 * Otherwise, it will return a Contract instance connected to a read-only provider.
 *
 * @param withSigner - Whether to connect the Contract instance to a signer. Defaults to false.
 * @param contract_address - The address of the contract.
 * @param abi - The ABI of the contract.
 * @returns A Contract instance, or null if it cannot be created.
 */
const useContractInstance = (
  withSigner: boolean = false,
  contract_address: string,
  abi: InterfaceAbi
): Contract | null => {
  const { signer, readOnlyProvider } = useSignerOrProvider();

  return useMemo(() => {
    try {
      if (withSigner) {
        if (!signer || !contract_address) return null;
        return new Contract(contract_address, abi, signer);
      }

      if (!contract_address || !readOnlyProvider) return null;
      return new Contract(contract_address, abi, readOnlyProvider);
    } catch (error) {
      console.error("Error creating contract instance:", error);
      return null;
    }
  }, [signer, readOnlyProvider, withSigner, contract_address, abi]);
};

export default useContractInstance;
