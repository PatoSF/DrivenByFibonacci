'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const tokens = ["ETH", "DAI", "USDC", "USDT", "FIBO", "EQBL"];

const SwapUI = () => {

    const [sellToken, setSellToken] = useState("ETH");
    const [buyToken, setBuyToken] = useState("FIBO");
    const [sellAmount, setSellAmount] = useState("");
    const [buyAmount, setBuyAmount] = useState("");

    const handleSwap = () => {
        setSellToken(buyToken);
        setBuyToken(sellToken);
        setSellAmount(buyAmount);
        setBuyAmount(sellAmount);
    };

    return (
        <section className="w-full min-h-screen flex justify-center items-center bg-[#fff9f4] text-[#191221]">
            <main className="max-w-xl w-full p-6 bg-[#ffefe4] rounded-lg shadow-md">
                <h1 className="md:text-2xl text-xl font-inter text-center font-bold mb-4">Swap</h1>

                {/* Sell Input */}
                <div className="bg-color1 p-4 rounded-md mb-3">
                    <div className="flex justify-between items-center">
                        <input
                            type="number"
                            placeholder="0"
                            value={sellAmount}
                            onChange={(e) => setSellAmount(e.target.value)}
                            className="bg-transparent border-none outline-none ring-0 focus:outline-none text-color2 focus:border-none text-2xl w-full"
                        />
                        <Select value={sellToken} onValueChange={setSellToken}>
                            <SelectTrigger className="w-[150px] bg-color5 text-color1 px-3 py-1 rounded-md ">
                                <SelectValue placeholder="Select Token" />
                            </SelectTrigger>
                            <SelectContent className="bg-color5 text-color1">
                                {tokens.map((token) => (
                                    <SelectItem key={token} value={token} className="cursor-pointer">{token}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Swap Button */}
                <div className="flex justify-center mb-3">
                    <button
                        onClick={handleSwap}
                        className="bg-[#CC4976] p-2 rounded-full hover:bg-[#7f316d] transition"
                    >
                        <ArrowDown className="text-white" />
                    </button>
                </div>

                {/* Buy Input */}
                <div className="bg-color1 p-4 rounded-md mb-3">
                    <div className="flex justify-between items-center">
                        <input
                            type="number"
                            placeholder="0"
                            value={buyAmount}
                            readOnly
                            className="bg-transparent border-none outline-none ring-0 focus:outline-none text-color2 focus:border-none text-2xl w-full"
                        />
                        <Select value={buyToken} onValueChange={setBuyToken}>
                            <SelectTrigger className="w-[150px] bg-color5 text-color1 px-3 py-1 rounded-md">
                                <SelectValue placeholder="Select Token" />
                            </SelectTrigger>
                            <SelectContent className="bg-color5 text-color1">
                                {tokens.map((token) => (
                                    <SelectItem key={token} value={token} className="cursor-pointer">{token}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Connect Wallet / Swap Button */}
                <Button size={`lg`} className="w-full bg-[#CC4976] text-color1 text-lg py-3 mt-4 hover:bg-color2">Connect Wallet</Button>
            </main>
        </section>
    )
}

export default SwapUI