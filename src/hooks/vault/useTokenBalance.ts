import { formatEther } from "ethers";
import useContractInstance from "../setup/useContractInstance";
import ERC20ABI from "@/constant/abis/ERC20Abi.json";
import { useAppKitAccount } from "@reown/appkit/react";

const useTokenBalance = (tokenAddress: string) => {
    const { address } = useAppKitAccount();
    const contract = useContractInstance(true, tokenAddress, ERC20ABI);
  
    const getBalance = async () => {
      try {
        if (!contract || !address) return "0";
        
        const balance = await contract.balanceOf(address);
        return formatEther(balance);
      } catch (error) {
        console.error("Error fetching token balance:", error);
        return "0";
      }
    };
  
    return getBalance;
  };


  export default useTokenBalance;
