import { JsonRpcProvider } from "ethers";

export const readOnlyProvider = new JsonRpcProvider(
  process.env.NEXT_PUBLIC_RPC_URL
);
