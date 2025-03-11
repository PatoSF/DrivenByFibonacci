import { useMemo } from "react";
import useSignerOrProvider from "./useSignerOrProvider";
import { Contract, InterfaceAbi } from "ethers";

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
