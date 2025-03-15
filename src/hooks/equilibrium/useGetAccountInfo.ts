import { useCallback, useEffect, useState } from "react";
import useContractInstance from "../setup/useContractInstance";
import { EquilibriumEngine } from "@/constant/contractAddresses";

const useGetAccountInfo = () => {
  const [balance, setBalance] = useState<number>(0);

  const contract = useContractInstance(true, EquilibriumEngine, ABI);

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

export default useGetAccountInfo;
