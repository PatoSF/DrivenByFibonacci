"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import Image from "next/image";
import { X } from "lucide-react";
import useFiboMarket from "@/hooks/useMarket";
import { toast } from "sonner";

type Token = {
  name: string;
  symbol: string;
  address: string;
  image: string;
};

const tokens: Token[] = [
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "0x5300000000000000000000000000000000000004",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    name: "USDC",
    symbol: "USDC",
    address: "0x690000EF01deCE82d837B5fAa2719AE47b156697",
    image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013",
  },
  {
    name: "DAI",
    symbol: "DAI",
    address: "0xFa94dA175bE505B915187EdC8aE2f62F4Ccbf848",
    image: "https://cryptologos.cc/logos/dai-dai-logo.png?v=013",
  },
  {
    name: "LINK",
    symbol: "LINK",
    address: "0x231d45b53C905c3d6201318156BDC725c9c3B9B1",
    image: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=013",
},
];

const Add = () => {
  const [amount, setAmount] = useState<number | undefined>();
  const [selectedTokens, setSelectedTokens] = useState<Token[]>([]);
  const { listTokens } = useFiboMarket();

  const handleTokenSelect = (value: string) => {
    const token = tokens.find((t) => t.symbol === value);
    if (token && !selectedTokens.some((t) => t.symbol === token.symbol)) {
      setSelectedTokens([...selectedTokens, token]);
    }
  };

  const removeToken = (symbol: string) => {
    setSelectedTokens((prev) => prev.filter((t) => t.symbol !== symbol));
  };

  const handleSubmit = async () => {
    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (selectedTokens.length === 0) {
      toast.error("Please select at least one token.");
      return;
    }

    try {
      const tokenAddresses = selectedTokens.map((token) => token.address);
      console.log(tokenAddresses);

      await listTokens(amount, tokenAddresses);
    } catch (error) {
      console.log(error);
      toast.error("Failed to list tokens.");
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
            <label className="text-sm text-color2 mb-1.5 block">
              Desired Tokens
            </label>
            <Select onValueChange={(value: string) => handleTokenSelect(value)}>
              <SelectTrigger className="w-full h-[42px] flex flex-wrap items-center gap-2 pointer-events-auto">
                {selectedTokens.length === 0 ? (
                  <span className="text-gray-500">Select desired tokens</span>
                ) : (
                  <div className="flex items-center gap-4 pointer-events-auto">
                    {selectedTokens.map((token, index) => (
                      <div
                        key={index}
                        className="relative flex items-center p-1 bg-gray-100 rounded pointer-events-auto"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Image
                          src={token.image}
                          alt={`${token.symbol} logo`}
                          width={20}
                          height={20}
                          className="w-6 h-6 rounded-full"
                        />
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            removeToken(token.symbol);
                          }}
                          className="absolute -top-[2px] -right-[2px] bg-color5 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center pointer-events-auto"
                        >
                          <X className="w-3 h-3" />
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </SelectTrigger>
              <SelectContent className="bg-white text-color2">
                {tokens.map((token) => (
                  <SelectItem
                    key={token.symbol}
                    value={token.symbol}
                    className="cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full">
                        <Image
                          src={token.image}
                          alt={`${token.symbol} logo`}
                          width={200}
                          height={200}
                          className="w-5 h-5 rounded-full"
                        />
                      </span>
                      {token.symbol}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
