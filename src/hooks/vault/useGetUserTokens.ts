import { useCallback, useEffect, useState } from "react";
import useContractInstance from "../setup/useContractInstance";
import { InterfaceAbi } from "ethers";

/**
 * Hook to get the user's tokens balance from a contract.
 *
 * It uses the `useContractInstance` hook to create an instance of the contract
 * and then calls the `getUserTokens` function on the contract to get the token
 * balance.
 *
 * @param contractAddress - The address of the contract
 * @param ABI - The ABI of the contract
 * @returns The user's token balance
 */
const useGetUserTokens = (contractAddress: string, ABI: InterfaceAbi) => {
  const [tokens, setToken] = useState<number>(0);
  const contract = useContractInstance(true, contractAddress, ABI);

  const getTokens = useCallback(async () => {
    if (!contract) return;

    try {
      const data = await contract.getUserTokens();
      setToken(Number(data));
    } catch (error) {
      console.error("Error getting user tokens:", error);
    }
  }, [contract]);

  useEffect(() => {
    getTokens();
  }, [getTokens]);

  return tokens;
};

export default useGetUserTokens;
