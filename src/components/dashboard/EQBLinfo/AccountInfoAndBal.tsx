'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import useGetAccountInfo from "@/hooks/equilibrium/useGetAccountInfo";
import useGetUserCollateralBalance from "@/hooks/equilibrium/useGetUserCollateralBalance";
import Image from "next/image";
import { useState } from "react";


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
];

const AccountInfoAndBal = () => {
    const [selectedToken, setSelectedToken] = useState<Token | null>(null);

    const handleTokenSelect = (symbol: string) => {
        const token = tokens.find((t) => t.symbol === symbol);
        if (token) {
            setSelectedToken(token);
        }
    };

    const balance = useGetUserCollateralBalance(selectedToken?.address || "")

    const { totalEqblMinted, collateralValue } = useGetAccountInfo()

    return (
        <section className="w-full py-20 md:py-28 md:px-10 px-4 grid md:grid-cols-2 md:gap-10 gap-8">
            <div className="w-full">
                <h3 className="text-color2 text-base font-sora font-medium">Account Information</h3>

                <Card className="w-full mt-3 bg-color0 rounded-xl">
                    <CardContent className="p-6">
                        <p className="text-color2 flex items-center gap-2 text-sm font-sora mb-3 font-medium">
                            <strong>Total Equilibrium Minted:</strong>
                            {totalEqblMinted}
                        </p>
                        <p className="text-color2 flex items-center gap-2 text-sm font-sora font-medium">
                            <strong>Collateral Value In USD:</strong>
                            ${collateralValue}
                        </p>
                    </CardContent>
                </Card>
            </div>


            {/* collateral */}
            <div className="w-full">
                <h3 className="text-color2 text-base font-sora font-medium">Collateral Balance</h3>

                <Card className="w-full mt-3 bg-color0 rounded-xl">
                    <CardContent className="p-6">
                        <p className="text-color2 flex items-center gap-2 font-sora mb-3 font-medium">
                            <strong>Your Collateral Balance:</strong>
                            {balance}
                        </p>
                        <div className="w-full mb-4">
                            <label className="text-sm text-color2 mb-1.5 block">
                                Select Token
                            </label>
                            <Select onValueChange={handleTokenSelect} >
                                <SelectTrigger className="w-full h-[42px] flex flex-wrap items-center gap-2 pointer-events-auto text-gray-500">
                                    {selectedToken ? (
                                        <span className="text-gray-500">{selectedToken.symbol}</span>
                                    ) : (
                                        <span className="text-gray-500">Select desired token</span>
                                    )}
                                </SelectTrigger>
                                <SelectContent className="bg-white text-color2">
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
                                                    />
                                                </span>
                                                {token.symbol}
                                            </span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

export default AccountInfoAndBal