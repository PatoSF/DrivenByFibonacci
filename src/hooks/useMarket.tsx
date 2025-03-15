import { parseUnits } from "ethers";
import useContractInstance from "./setup/useContractInstance";
import { useAppKitAccount } from "@reown/appkit/react";
import { useCallback } from "react";
import { toast } from "sonner";
import { MarketAdress } from "@/constant/contractAddresses";
import MarketABI from "@/constant/abis/MarketAbi.json";


const useFiboMarket = () => {
  const contract = useContractInstance(true, MarketAdress, MarketABI);
  const { address } = useAppKitAccount();

  const listTokens = useCallback(
    async (amount: number, desiredTokens: string[]) => {
      if (!contract || !address) {
        toast.error("Wallet not connected");
        return;
      }
      try {
        const tx = await contract.listTokens(
          parseUnits(amount.toString(), 18),
          desiredTokens
        );
        await tx.wait();
        toast.success("Tokens listed successfully");
      } catch (error: any) {
        console.log(error);
        
        toast.error(error.message || "Failed to list tokens");
      }
    },
    [contract, address]
  );

  const removeListing = useCallback(
    async (listingId: number) => {
      if (!contract || !address) {
        toast.error("Wallet not connected");
        return;
      }
      try {
        const tx = await contract.removeListing(listingId);
        await tx.wait();
        toast.success("Listing removed successfully");
      } catch (error: any) {
        console.log(error);
        
        toast.error(error.message || "Failed to remove listing");
      }
    },
    [contract, address]
  );

  const buyFIBO = useCallback(
    async (
      holder: string,
      listingId: number,
      amount: number,
      exchangedAmount: number,
      desiredTokens: string,
      slippage: number
    ) => {
      if (!contract || !address) {
        toast.error("Wallet not connected");
        return;
      }
      try {
        const tx = await contract.BuyFIBO(
          holder,
          listingId,
          parseUnits(amount.toString(), 18),
          parseUnits(exchangedAmount.toString(), 18),
          desiredTokens,
          slippage
        );
        await tx.wait();
        toast.success("Tokens purchased successfully");
      } catch (error: any) {
        console.log(error);
        
        toast.error(error.message || "Failed to buy tokens");
      }
    },
    [contract, address]
  );

  return { listTokens, removeListing, buyFIBO };
};

export default useFiboMarket;
