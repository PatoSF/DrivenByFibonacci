import React from 'react'

const Metrics = () => {
    return (
        <section className="w-full bg-color1 md:py-28 py-20 px-4 md:px-0">
            <h1 className="text-color2 md:text-4xl mb-2 text-3xl text-center font-inter font-bold">Core Financial Metrics: FIBO & EQBL Performance</h1>
            <p className="max-w-2xl text-center text-color2/80 md:text-lg text-base font-nunitoSans font-light mx-auto lg:mb-8 mb-10">Monitor the performance of FIBO and EQBL with real-time insights on transactions, market trends, and liquidity movements. Stay ahead with detailed analytics on price changes, adoption rates, and trading activity.</p>

            <main className='max-w-5xl mx-auto'>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full text-base">
                        <thead className="bg-color2">
                            <tr className="text-left text-color1 font-marcellus">
                                <th className="px-4 py-5">Metric</th>
                                <th className="px-3 py-5">FIBO Value</th>
                                <th className="px-3 py-5">FIBO % Change</th>
                                <th className="px-3 py-5">EQBL Value</th>
                                <th className="px-3 py-5">EQBL % Change</th>
                            </tr>
                        </thead>
                        <tbody className='text-sm font-nunitoSans'>
                            {
                                coreFinancialMetrics.map((item, index) => (
                                    <tr key={index} className="border-b border-opacity-10 border-color2 bg-color0/50">
                                        <td className="px-4 py-5">
                                            <p>{item.metric}</p>
                                        </td>
                                        <td className="px-3 py-5">
                                            <p>{item.fiboValue}</p>
                                        </td>
                                        <td className="px-3 py-5">
                                            <p>{item.fiboChange}</p>
                                        </td>
                                        <td className="px-3 py-5">
                                            <p>{item.eqblValue}</p>
                                        </td>
                                        <td className="px-3 py-5">
                                            <p>{item.eqblChange}</p>
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

export default Metrics

const coreFinancialMetrics = [
    {
        metric: "Transactions (Yearly) 📊",
        fiboValue: "1,200,000",
        fiboChange: "📈 +15.3%",
        eqblValue: "980,000",
        eqblChange: "📈 +12.8%",
    },
    {
        metric: "Transactions (Quarterly) 🔄",
        fiboValue: "280,000",
        fiboChange: "📈 +4.7%",
        eqblValue: "240,000",
        eqblChange: "📈 +3.9%",
    },
    {
        metric: "Transactions (Weekly) 🗓️",
        fiboValue: "22,500",
        fiboChange: "📈 +2.1%",
        eqblValue: "19,000",
        eqblChange: "📈 +1.8%",
    },
    {
        metric: "Token Price ($USD) 💰",
        fiboValue: "$3.42",
        fiboChange: "📈 +6.8% MoM",
        eqblValue: "$2.88",
        eqblChange: "📈 +5.2% MoM",
    },
    {
        metric: "Market Cap ($M) 💲",
        fiboValue: "750",
        fiboChange: "📈 +9.1% QoQ",
        eqblValue: "620",
        eqblChange: "📈 +7.5% QoQ",
    },
    {
        metric: "TVL ($M) 📦",
        fiboValue: "1,100",
        fiboChange: "📈 +10.2%",
        eqblValue: "870",
        eqblChange: "📈 +8.3%",
    },
    {
        metric: "BuyFibo Transactions (MoM) 🛒",
        fiboValue: "52,000",
        fiboChange: "📈 +7.2%",
        eqblValue: "—",
        eqblChange: "-",
    },
    {
        metric: "Active Wallets (30D) 👛",
        fiboValue: "85,000",
        fiboChange: "📈 +5.4%",
        eqblValue: "72,000",
        eqblChange: "📈 +4.9%",
    },
    {
        metric: "Liquidity Growth ($M) 🌊",
        fiboValue: "450",
        fiboChange: "📈 +11.6%",
        eqblValue: "390",
        eqblChange: "📈 +9.8%",
    },
];
