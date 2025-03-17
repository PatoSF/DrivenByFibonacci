/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contract, parseUnits } from "ethers";
import useContractInstance from "./setup/useContractInstance";
import { useAppKitAccount } from "@reown/appkit/react";
import { useCallback } from "react";
import { toast } from "sonner";
import { MarketAdress } from "@/constant/contractAddresses";
import MarketABI from "@/constant/abis/MarketAbi.json";
import { ERC20ApproveABI } from "./equilibrium/useDepositCollateral";
import useSignerOrProvider from "./setup/useSignerOrProvider";

const useFiboMarket = () => {
  const contract = useContractInstance(true, MarketAdress, MarketABI);
  const { address } = useAppKitAccount();
  const { signer } = useSignerOrProvider();

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
      listingId: number,
      amount: number,
      exchangedAmount: number,
      desiredTokens: string
    ) => {
      if (!contract || !address) {
        toast.error("Wallet not connected");
        return;
      }

      const ERC20Contract = new Contract(
        desiredTokens,
        ERC20ApproveABI,
        signer
      );

      try {
        // First approving the contract to spend the token
        // const approveTx = await ERC20Contract.approve(MarketAdress,  parseUnits(amount.toString(), 18));
        // await approveTx.wait();
        console.log(address, listingId, desiredTokens, amount);

        const tx = await contract.BuyFIBO(
          address,
          BigInt(listingId),
          amount,
          // parseUnits(exchangedAmount.toString(), 18),
          exchangedAmount,
          desiredTokens,
          1
        );
        await tx.wait();
        toast.success("Tokens purchased successfully");
      } catch (error: any) {
        console.log(error);

        toast.error(error.message || "Failed to buy tokens");
      }
    },
    [signer, contract, address]
  );

  return { listTokens, removeListing, buyFIBO };
};

export default useFiboMarket;
