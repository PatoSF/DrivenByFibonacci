import { InterfaceAbi } from "ethers";
import { useCallback, useEffect, useState } from "react";
import useContractInstance from "../setup/useContractInstance";

/**
 * Hook to get the balance of the contract.
 *
 * It uses the `useContractInstance` hook to create an instance of the contract
 * and then calls the `balance` function on the contract to get the balance.
 *
 * @param contractAddress - The address of the contract
 * @param ABI - The ABI of the contract
 * @returns The balance of the contract as a number
 */
const useGetBalance = (contractAddress: string, ABI: InterfaceAbi) => {
  const [balance, setBalance] = useState<number>(0);
  const contract = useContractInstance(true, contractAddress, ABI);

  const getBalance = useCallback(async () => {
    if (!contract) return;

    try {
      const data = await contract.balance();
      setBalance(Number(data));
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  }, [contract]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return balance;
};

export default useGetBalance;
