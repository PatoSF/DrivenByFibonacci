import { JsonRpcProvider } from "ethers";

// TODO: add RPC URL to .env
export const readOnlyProvider = new JsonRpcProvider(process.env.RPC_URL);
