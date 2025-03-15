import { useCallback, useEffect, useState } from "react";
import useContractInstance from "../setup/useContractInstance";
import { EquilibriumEngine } from "@/constant/contractAddresses";
import EqblABI from "../../constant/abis/EquilibriumEngineAbi.json";
import { useAppKitAccount } from "@reown/appkit/react";
import { ethers } from "ethers";

const useGetAccountInfo = () => {
  const [totalEqblMinted, setTotalEqblMinted] = useState<string>("0");
  const [collateralValue, setCollateralValue] = useState<string>("0");

  const { address } = useAppKitAccount();

  const contract = useContractInstance(true, EquilibriumEngine, EqblABI);

  const getBalances = useCallback(async () => {
    if (!contract || !address) return;

    try {
      const data = await contract.getAccountInformation(address);
      console.log(data);

      const formattedTotalEqblMinted = ethers.formatUnits(data[0], 18);
      const formattedCollateralValue = ethers.formatUnits(data[1], 6);

      setTotalEqblMinted(formattedTotalEqblMinted);
      setCollateralValue(formattedCollateralValue);
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  }, [contract, address]);

  useEffect(() => {
    getBalances();
  }, [getBalances]);

  return {
    totalEqblMinted,
    collateralValue,
  };
};

export default useGetAccountInfo;
