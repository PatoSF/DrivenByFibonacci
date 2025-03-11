import { InterfaceAbi } from "ethers";
import { useCallback, useEffect, useState } from "react";
import useContractInstance from "../setup/useContractInstance";

/**
 * Hook to get the total balance from a contract.
 *
 * It uses the `useContractInstance` hook to create an instance of the contract
 * and then calls the `totalBalance` function on the contract to retrieve the total balance.
 *
 * @param contractAddress - The address of the contract
 * @param ABI - The ABI of the contract
 * @returns The total balance as a number
 */

const useGetTotalBalance = (contractAddress: string, ABI: InterfaceAbi) => {
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const contract = useContractInstance(true, contractAddress, ABI);

  const getTotalBal = useCallback(async () => {
    if (!contract) return;

    try {
      const data = await contract.totalBalance();
      setTotalBalance(Number(data));
    } catch (error) {
      console.error("Error getting total balance:", error);
    }
  }, [contract]);

  useEffect(() => {
    getTotalBal();
  }, [getTotalBal]);

  return totalBalance;
};

export default useGetTotalBalance;
