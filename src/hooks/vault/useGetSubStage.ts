import { InterfaceAbi } from "ethers";
import { useCallback, useEffect, useState } from "react";
import useContractInstance from "../setup/useContractInstance";

/**
 * Hook to get the current sub-stage from a contract.
 *
 * It uses the `useContractInstance` hook to create an instance of the contract
 * and then calls the `getSubstage` function on the contract to obtain the current sub-stage.
 *
 * @param contractAddress - The address of the contract
 * @param ABI - The ABI of the contract
 * @returns The current sub-stage as a number
 */

const useGetSubStage = (contractAddress: string, ABI: InterfaceAbi) => {
  const [subStage, setSubStage] = useState<number>(0);
  const contract = useContractInstance(true, contractAddress, ABI);

  const getSubStage = useCallback(async () => {
    if (!contract) return;

    try {
      const data = await contract.getSubstage();
      setSubStage(Number(data));
    } catch (error) {
      console.error("Error getting substage:", error);
    }
  }, [contract]);

  useEffect(() => {
    getSubStage();
  }, [getSubStage]);

  return subStage;
};

export default useGetSubStage;
