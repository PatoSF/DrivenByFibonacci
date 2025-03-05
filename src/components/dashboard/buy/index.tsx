import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";


export default function Buy() {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const handleFromValueChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    if (value === "" || (!isNaN(Number(value)) && Number(value) >= 0)) {
      setFromAmount(value);
      setToAmount(value ? (Number(value) * 0.8).toString() : "");
    }
  };


  const isSwapDisabled =
    !fromAmount ||
    !toAmount ||
    Number(fromAmount) <= 0;

  return (
    <div className="mt-20 max-w-lg mx-auto">
      <span className="text-2xl px-4 py-2">Buy</span>

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

              <div className="w-[150px] px-3 py-2 flex gap-5 items-center border-0 border-none rounded-full bg-color5 text-white">
                <span className="flex items-center justify-center w-6 h-6 bg-color0 rounded-full">
                  <Image
                    src="https://cryptologos.cc/logos/usd-coin-usdc-logo.png?v=013"
                    alt="USDC logo"
                    width={200}
                    height={200}
                    className="w-5 h-5 rounded-full"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                
                </span>
                <span className="text-sm text-center">USDC</span>
              </div>
            </div>
          </div>

          <div className="relative h-0">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full shadow-md"
              >
                <ArrowDown className="h-4 w-4" />
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
             <div className="w-[150px] px-3 py-2 flex gap-5 items-center border-0 border-none rounded-full bg-color5 text-white">
                <span className="flex items-center justify-center w-6 h-6 bg-color0 rounded-full">
                  <Image
                    src="/fibo-logo.png"
                    alt="USDC logo"
                    width={200}
                    height={200}
                    className="w-5 h-5 rounded-full"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                
                </span>
                <span className="text-sm text-center">FIBO</span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-sm">
            <br className="my-4" />
            {fromAmount && toAmount && Number(fromAmount) > 0 && (
              <div className="flex justify-between font-medium">
                <span>Rate</span>
                <span>
                  1 {"USDC"} ={" "}
                  {(Number(toAmount) / Number(fromAmount)).toFixed(6)}{" "}
                  {"FIBO"}
                </span>
              </div>
            )}
          </div>

          <Button
            className="w-full bg-color5 mt-4 px-6 py-6 text-white text-lg hover:text-white rounded-full"
            size="lg"
            disabled={isSwapDisabled}
          >
            {"Buy"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}