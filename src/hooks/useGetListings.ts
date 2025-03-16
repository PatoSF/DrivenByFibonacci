import MarketABI from "@/constant/abis/MarketAbi.json";
import MultiCallABI from "@/constant/abis/MultiCall3Abi.json";
import { useEffect, useState } from "react";
import useContractInstance from "./setup/useContractInstance";
import { MarketAdress, Multicall3 } from "@/constant/contractAddresses";
import { ethers } from "ethers";
import { readOnlyProvider } from "@/constant/readOnlyProvider";

const useGetListings = () => {
  const [data, setData] = useState([]);
  const [numOfListings, setNumOfListings] = useState(0);

  const contract = useContractInstance(false, MarketAdress, MarketABI);

  useEffect(() => {
    (async () => {
      contract
        ?.listingIdCounter()
        .then((res) => setNumOfListings(Number(res)))
        .catch((err) => console.log(err));

      console.log(numOfListings);

      const listingIDs = [...Array.from({ length: numOfListings })].map(
        (_, index) => index
      );

      const itf = new ethers.Interface(MarketABI);
      const calls = listingIDs.map((x) => ({
        target: MarketAdress,
        callData: itf.encodeFunctionData("getListing", [x]),
      }));

      const multicall = new ethers.Contract(
        Multicall3,
        MultiCallABI,
        readOnlyProvider
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, result] = await multicall.tryAggregate.staticCall(false, calls);

      const decodedResponses = result.map((x: never) =>
        itf.decodeFunctionResult("getListing", x)
      );

      console.log(decodedResponses);

      setData(decodedResponses);
    })();
  }, [contract, numOfListings]);

  return data;
};

export default useGetListings;
