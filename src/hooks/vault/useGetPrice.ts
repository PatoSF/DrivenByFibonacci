import { InterfaceAbi } from "ethers";
import { useCallback, useEffect, useState } from "react";
import useContractInstance from "../setup/useContractInstance";

const useGetPrice = (contractAddress: string, ABI: InterfaceAbi) => {
  const [price, setPrice] = useState<number>(0);
  const contract = useContractInstance(true, contractAddress, ABI);

  const getprice = useCallback(async () => {
    if (!contract) return;

    try {
      const data = await contract.getPrice();
      setPrice(Number(data));
    } catch (error) {
      console.error("Error getting price:", error);
    }
  }, [contract]);

  useEffect(() => {
    getprice();
  }, [getprice]);

  return price;
};

export default useGetPrice;
