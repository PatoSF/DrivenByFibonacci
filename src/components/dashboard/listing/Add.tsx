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

const Add = () => {
    const [amount, setAmount] = useState<number>();
    const [selectedTokens, setSelectedTokens] = useState<Token[]>([]);

    const handleTokenSelect = (value: string) => {
        const token = tokens.find((t) => t.symbol === value);
        if (token && !selectedTokens.some((t) => t.symbol === token.symbol)) {
            setSelectedTokens([...selectedTokens, token]);
        }
    };

    const removeToken = (symbol: string) => {
        setSelectedTokens((prev) => prev.filter((t) => t.symbol !== symbol));
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
                            value={amount}
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
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeToken(token.symbol);
                                                    }}
                                                    className="absolute -top-[2px] -right-[2px] bg-color5 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center pointer-events-auto"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
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
