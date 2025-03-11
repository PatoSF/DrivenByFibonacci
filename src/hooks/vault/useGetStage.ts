import { InterfaceAbi } from "ethers";
import { useCallback, useEffect, useState } from "react";
import useContractInstance from "../setup/useContractInstance";

/**
 * Hook to get the current stage from a contract.
 *
 * It uses the `useContractInstance` hook to create an instance of the contract
 * and then calls the `getStage` function on the contract to get the current stage.
 *
 * @param contractAddress - The address of the contract
 * @param ABI - The ABI of the contract
 * @returns The current stage as a number
 */

const useGetStage = (contractAddress: string, ABI: InterfaceAbi) => {
  const [stage, setStage] = useState<number>(0);
  const contract = useContractInstance(true, contractAddress, ABI);

  const getStage = useCallback(async () => {
    if (!contract) return;

    try {
      const data = await contract.getStage();
      setStage(Number(data));
    } catch (error) {
      console.error("Error getting stage:", error);
    }
  }, [contract]);

  useEffect(() => {
    getStage();
  }, [getStage]);

  return stage;
};

export default useGetStage;
