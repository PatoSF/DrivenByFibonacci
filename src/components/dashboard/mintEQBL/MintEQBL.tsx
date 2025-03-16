"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import useMintEqbl from "@/hooks/equilibrium/useMintEquilibrum";
import React, { useState } from "react";

const MintEQBLComponent = () => {
  const [amount, setAmount] = useState<number | string>("");

  const handleDepositAndMint = useMintEqbl();

  const handleMint = async () => {
    await handleDepositAndMint(Number(amount));
  };

  return (
    <div className="">
      <span className="text-xl px-4 py-2 font-sora font-medium">
        Mint EQBL
      </span>

      <Card className="w-full mt-6 bg-color0 rounded-xl">
        <CardContent className="p-6">
          <div className="w-full mb-4">
            <label className="text-sm text-color2 mb-1.5 block">
              EQBL Amount to Mint
            </label>
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-[42px] border-0 bg-color1 text-color2 text-xl px-4 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <Button
            className="w-full bg-color5 mt-4 px-6 py-6 text-white text-base hover:text-white rounded-xl"
            onClick={handleMint}
          >
            Mint EQBL
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MintEQBLComponent;
