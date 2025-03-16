import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

// Define the token type
type Token = {
  name: string;
  symbol: string;
  address: string;
  image: string;
};

const tokens: Token[] = [
  {
    name: "FIBO",
    symbol: "FIBO",
    address: "fib",
    image: "/fibo-logo.png",
  },
  {
    name: "EQBL",
    symbol: "EQBL",
    address: "eqbl",
    image: "/fibo-logo.png",
  },
  {
    name: "Ethereum",
    symbol: "ETH",
    address: "ethereum",
    image: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
  },
  {
    name: "USDC",
    symbol: "USDC",
    address: "usdc",
    image: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013",
  },
  {
    name: "UniToken",
    symbol: "UNI",
    address: "unitoken",
    image: "https://cryptologos.cc/logos/uniswap-uni-logo.png?v=013",
  },
  {
    name: "LINK",
    symbol: "LINK",
    address: "lnk",
    image: "https://cryptologos.cc/logos/chainlink-link-logo.png?v=013",
  },
];

export default function Swap() {
  const [fromAsset, setFromAsset] = useState<Token>(tokens[0]);
  const [toAsset, setToAsset] = useState<Token>(tokens[2]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const handleFromValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "" || (!isNaN(Number(value)) && Number(value) >= 0)) {
      setFromAmount(value);
      // Simple placeholder conversion logic
      setToAmount(value ? (Number(value) * 0.8).toString() : "");
    }
  };

  const handleSwapDirection = () => {
    setFromAsset(toAsset);
    setToAsset(fromAsset);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  const handleTokenChange = (type: "from" | "to", token: Token) => {
    if (type === "from") setFromAsset(token);
    else setToAsset(token);
    setFromAmount("");
    setToAmount("");
  };

  const isSwapDisabled =
    !fromAmount ||
    !toAmount ||
    Number(fromAmount) <= 0 ||
    fromAsset.address === toAsset.address;

  return (
    <div className="mt-20 max-w-lg mx-auto">
      <span className="text-2xl px-4 py-2">Swap</span>

      <Card className="w-full mt-6 bg-color0 rounded-3xl">
        <CardContent className="p-3">
          <div className="rounded-2xl bg-color1 p-4 py-6 h-32 mb-2">
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-600">You pay</label>
            </div>
            <div className="flex gap-2 items-center">
              <Input
                type="text"
                placeholder="0.0"
                value={fromAmount}
                onChange={handleFromValueChange}
                className="border-0 bg-transparent text-2xl focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              />
              <Select
                value={fromAsset.symbol}
                onValueChange={(value: string) => {
                  const token = tokens.find((t) => t.symbol === value);
                  if (token) handleTokenChange("from", token);
                }}
              >
                <SelectTrigger className="w-[130px] border-0 border-none rounded-full bg-color5 text-white">
                  <SelectValue placeholder={toAsset.symbol} />
                </SelectTrigger>
                <SelectContent className="bg-color5 text-white border-zinc-800">
                  {tokens.map((token) => (
                    <SelectItem key={token.name} value={token.symbol}>
                      <span className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 bg-color0 rounded-full">
                          <Image
                            src={token?.image}
                            alt={`${token?.symbol} logo`}
                            width={200}
                            height={200}
                            className="w-5 h-5 rounded-full"
                            onError={(e) =>
                              (e.currentTarget.style.display = "none")
                            }
                          />
                        </span>
                        {token.symbol}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="relative h-0">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full shadow-md"
                onClick={handleSwapDirection}
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="rounded-2xl bg-color1 p-4 py-6 h-32 mt-2">
            <div className="flex justify-between mb-2">
              <label className="text-base text-gray-600">You receive</label>
            </div>
            <div className="flex gap-2 items-center">
              <Input
                type="text"
                placeholder="0.0"
                value={toAmount}
                readOnly
                className="border-0 bg-transparent text-2xl focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              />
              <Select
                value={toAsset.symbol}
                onValueChange={(value: string) => {
                  const token = tokens.find((t) => t.symbol === value);
                  if (token) handleTokenChange("to", token);
                }}
              >
                <SelectTrigger className="w-[130px] border-0 border-none rounded-full bg-color5 text-white">
                  <SelectValue placeholder={toAsset.symbol} />
                </SelectTrigger>
                <SelectContent className="bg-color5 text-white border-zinc-800">
                  {tokens.map((token) => (
                    <SelectItem key={token.name} value={token.symbol}>
                      <span className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-6 h-6 bg-color0 rounded-full">
                          <Image
                            src={token?.image}
                            alt={`${token?.symbol} logo`}
                            width={200}
                            height={200}
                            className="w-5 h-5 rounded-full"
                            onError={(e) =>
                              (e.currentTarget.style.display = "none")
                            }
                          />
                        </span>
                        {token.symbol}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <br className="my-4" />
            {fromAmount && toAmount && Number(fromAmount) > 0 && (
              <div className="flex justify-between font-medium">
                <span>Rate</span>
                <span>
                  1 {fromAsset.name} ={" "}
                  {(Number(toAmount) / Number(fromAmount)).toFixed(6)}{" "}
                  {toAsset.name}
                </span>
              </div>
            )}
          </div>

          <Button
            className="w-full bg-color5 mt-4 px-6 py-6 text-white text-lg hover:text-white rounded-full"
            size="lg"
            disabled={isSwapDisabled}
          >
            {"Swap"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
