import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";


export default function Mint() {
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
      <span className="text-2xl px-4 py-2">Mint</span>

      <Card className="w-full mt-6 bg-color0 rounded-3xl">
        <CardContent className="p-3">
          <div className="rounded-2xl bg-color1 p-4 py-6 h-32 mb-2">
            <div className="flex justify-between mb-2">
              <label className="text-sm text-gray-600">Mint Amount</label>
            </div>
            <div className="flex gap-2 items-center">
              <Input
                type="text"
                placeholder="0.0"
                value={fromAmount}
                onChange={handleFromValueChange}
                className="border-0 bg-transparent text-2xl focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
              />

              <div className="w-[150px] px-3 py-2 flex items-center gap-5 border-0 border-none rounded-full bg-color5 text-white">
                <span className="flex items-center justify-center w-6 h-6 bg-color0 rounded-full">
                  <Image
                    src="/fibo-logo.png"
                    alt="FIBO logo"
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

          <Button
            className="w-full bg-color5 mt-4 px-6 py-6 text-white text-lg hover:text-white rounded-full"
            size="lg"
            disabled={isSwapDisabled}
          >
            {"Mint"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
