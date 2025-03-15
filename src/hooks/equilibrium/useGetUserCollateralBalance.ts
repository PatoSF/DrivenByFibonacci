import { useCallback, useEffect, useState } from "react";
import useContractInstance from "../setup/useContractInstance";
import { EquilibriumEngine } from "@/constant/contractAddresses";
import EqblABI from "../../constant/abis/EquilibriumEngineAbi.json";
import { useAppKitAccount } from "@reown/appkit/react";
import { ethers } from "ethers";

const useGetUserCollateralBalance = (token: string) => {
  const [balance, setBalance] = useState<string>("0");

  const { address } = useAppKitAccount();

  const contract = useContractInstance(true, EquilibriumEngine, EqblABI);

  const getBalance = useCallback(async () => {
    if (!contract || !address || !token) return;

    try {
      const data = await contract.getCollateralBalanceOfUser(address, token);
      console.log(data);

      const formattedBal = ethers.formatUnits(data, 18);

      setBalance(formattedBal);
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  }, [contract, address, token]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);

  return balance;
};

export default useGetUserCollateralBalance;
