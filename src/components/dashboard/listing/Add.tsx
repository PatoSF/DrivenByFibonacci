"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import Image from "next/image";
import { Minus, Plus, X } from "lucide-react";
import useFiboMarket from "@/hooks/useMarket";
import { toast } from "sonner";
import { CardTitle } from "@/components/ui/card-hover-effect";
import { bool } from "yup";

// type Token = {
//     name: string;
//     symbol: string;
//     address: string;
//     image: string;
// };

// const tokens: Token[] = [
//     {
//         name: "Ethereum",
//         symbol: "ETH",
//         address: "0xEthereumAddress",
//         image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
//     },
//     {
//         name: "USDC",
//         symbol: "USDC",
//         address: "0xUsdcAddress",
//         image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013",
//     },
//     {
//         name: "UniToken",
//         symbol: "UNI",
//         address: "0xUniAddress",
//         image: "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=013",
//     },
//     {
//         name: "LINK",
//         symbol: "LINK",
//         address: "0xLinkAddress",
//         image: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=013",
//     },
// ];

const Add = () => {
  const [amount, setAmount] = useState<number | undefined>();
  const [tokenAddresses, setTokenAddresses] = useState<string[]>([""]);
  const [isLoading, setIsLoading] = useState(false);
  const { listTokens } = useFiboMarket();

  const addTokenAddressField = () => {
    setTokenAddresses([...tokenAddresses, ""]);
  };

  const removeTokenAddressField = (index: number) => {
    if (tokenAddresses.length > 1) {
      setTokenAddresses(tokenAddresses.filter((_, i) => i !== index));
    }
  };

  const updateTokenAddress = (index: number, value: string) => {
    const newAddresses = [...tokenAddresses];
    newAddresses[index] = value;
    setTokenAddresses(newAddresses);
  };

  const handleSubmit = async () => {
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    // Filter out empty addresses
    const validAddresses = tokenAddresses.filter((addr) => addr.trim() !== "");

    if (validAddresses.length === 0) {
      toast.error("Please enter at least one token address");
      return;
    }

    setIsLoading(true);
    try {
      await listTokens(amount, validAddresses).then(() => {
        setAmount(undefined);
        setTokenAddresses([""]);
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to list tokens");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-color2 text-xl font-sora font-medium">Add Listing</h3>

      <Card className="w-full mt-3 bg-color0 rounded-xl">
        <CardContent className="p-6">
          <div className="w-full mb-4">
            <label className="text-sm text-color2 mb-1.5 block">Amount</label>
            <Input
              type="number"
              placeholder="0"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-[42px] border-0 bg-color1 text-color2 text-xl px-4 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="w-full mb-4">
            <label className="text-sm text-color2 mb-1.5 block">Desired Token </label>
            <div className="space-y-2">
              {tokenAddresses.map((tokenAddress, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    placeholder="Token address (0x...)"
                    value={tokenAddress}
                    onChange={(e) => updateTokenAddress(index, e.target.value)}
                    className="w-full h-[42px] border-0 bg-color1 text-color2 px-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                  <button
                    type="button"
                    onClick={() => removeTokenAddressField(index)}
                    disabled={tokenAddresses.length <= 1}
                    className="h-5 w-5 bg-transparent text-red-500 rounded-full text-xs flex items-center justify-center disabled:opacity-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addTokenAddressField}
              className="mt-2 flex items-center gap-1 text-color2 border border-dashed border-color2 rounded-lg px-3 py-2 text-sm hover:bg-color1/50 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Another Token Address
            </button>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-color5 mt-7 text-white text-lg hover:text-white rounded-lg"
          >
            Add Listing
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Add;
