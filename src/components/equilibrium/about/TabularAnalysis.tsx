import React from 'react'

const TabularAnalysis = () => {
    return (
        <section className="w-full bg-color1 md:pb-28 pb-20 px-4 md:px-0">
            <h1 className="text-color2 md:text-4xl lg:mb-8 mb-10 text-3xl text-center font-inter font-bold">$EQBL vs. Traditional Stablecoins</h1>
            <main className='max-w-5xl mx-auto'>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full text-base">
                        <thead className="bg-color2">
                            <tr className="text-left text-color1 font-marcellus">
                                <th className="px-4 py-5">Feature</th>
                                <th className="px-3 py-5">EQBL</th>
                                <th className="px-3 py-5">Centralized Stablecoins</th>
                                <th className="px-3 py-5">Algorithmic Stablecoins</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm font-nunitoSans'>
                            {
                                eulerVsStablecoins.map((item, index) => (
                                    <tr key={index} className="border-b border-opacity-10 border-color2 bg-color0/50">
                                        <td className="px-4 py-5">
                                            <p>{item.feature}</p>
                                        </td>
                                        <td className="px-3 py-5">
                                            <p>{item.euler}</p>
                                        </td>
                                        <td className="px-3 py-5">
                                            <p>{item.centralizedStablecoins}</p>
                                        </td>
                                        <td className="px-3 py-5">
                                            <p>{item.algorithmicStablecoins}</p>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </main>
        </section>
    )
}

export default TabularAnalysis


type EulerVsStablecoinsTypes = {
    feature: string,
    euler: string,
    centralizedStablecoins: string,
    algorithmicStablecoins: string
}


const eulerVsStablecoins: EulerVsStablecoinsTypes[] = [
    {
        feature: "Decentralization",
        euler: "✅ Fully decentralized",
        centralizedStablecoins: "❌ Centralized reserves",
        algorithmicStablecoins: "✅ Algorithmic",
    },
    {
        feature: "Mathematically Backed",
        euler: "✅ Yes, based on financial models",
        centralizedStablecoins: "❌ No",
        algorithmicStablecoins: "✅ Yes, but unstable",
    },
    {
        feature: "Liquidity & Market Access",
        euler: "✅ Global & seamless",
        centralizedStablecoins: "❌ Limited accessibility",
        algorithmicStablecoins: "✅ Moderate",
    },
    {
        feature: "Censorship Resistance",
        euler: "✅ Yes, fully permissionless",
        centralizedStablecoins: "❌ No",
        algorithmicStablecoins: "✅ Yes",
    },
    {
        feature: "Scalability",
        euler: "✅ High, adaptive supply",
        centralizedStablecoins: "❌ Limited reserves",
        algorithmicStablecoins: "✅ Moderate",
    },
    {
        feature: "Peg Stability",
        euler: "✅ Strong market mechanisms",
        centralizedStablecoins: "✅ Fiat-backed",
        algorithmicStablecoins: "❌ Historically weak",
    },
];
