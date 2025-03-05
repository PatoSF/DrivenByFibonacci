import React from 'react'
import CryptoCard from './chartCard'
import TokenDistribution from './token-distribution'
import { token1, token2, token3 } from "@/utils/TokenData";

const MarketOverview = () => {
    return (
        <section className="w-full pt-10 pb-20 bg-color1 px-4 md:px-0">
            <main className="max-w-6xl mx-auto flex flex-col md:gap-12 gap-6 items-center">
                <h1 className="text-color2 md:text-4xl text-3xl font-inter font-semibold">Market Overview</h1>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                    <CryptoCard
                        name="FIBO"
                        price="0.9977"
                        supply="526.136M"
                        marketCap="$524.93M"
                        chartData={token1}
                        yAxisDomain={[0.97, 1.08]}
                    />
                    <CryptoCard
                        name="EQBL"
                        price="1.852"
                        supply="87.475M"
                        marketCap="$163.865M"
                        chartData={token2}
                        yAxisDomain={[1500, 5000]}
                        supplyLabel="SUPPLY"
                        marketCapLabel="CIRC. MARKET CAP"
                    />

                    <CryptoCard
                        name="FIBO X"
                        price="1.852"
                        supply="87.475M"
                        marketCap="$163.865M"
                        chartData={token3}
                        yAxisDomain={[1500, 5000]}
                        supplyLabel="SUPPLY"
                        marketCapLabel="CIRC. MARKET CAP"
                    />

                    <TokenDistribution />
                </div>
            </main>
        </section>
    )
}

export default MarketOverview