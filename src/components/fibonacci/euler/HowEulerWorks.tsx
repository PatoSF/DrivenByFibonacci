import { HoverEffect } from '@/components/ui/card-hover-effect'
import React from 'react'
import { FaBalanceScale, FaCalculator, FaCoins, FaExchangeAlt } from 'react-icons/fa'

const HowEulerWorks = () => {
    return (
        <section className="w-full lg:py-28 md:py-20 py-16 flex flex-col gap-4 justify-center items-center bg-gradient-to-b from-color2 to-[#0a0a0a]">
            <h1 className="text-color1 font-semibold lg:text-5xl md:text-4xl text-3xl font-inter">How Euler Works</h1>
            <div className="max-w-4xl mx-auto px-8">
                <HoverEffect items={howEulerWorks} />
            </div>
        </section>
    )
}

export default HowEulerWorks

const howEulerWorks = [
    {
        step: "1",
        title: "Mathematical Issuance",
        description: "EulerFi utilizes algorithmic stabilization to maintain predictable supply dynamics.",
        icon: <FaCalculator />,
    },
    {
        step: "2",
        title: "Algorithmic Pegging",
        description: "Euler maintains price stability using an adaptive supply mechanism and market-driven forces.",
        icon: <FaBalanceScale />,
    },
    {
        step: "3",
        title: "Integration & Liquidity",
        description: "EulerFi integrates with DeFi, exchanges, and institutional finance to enable seamless liquidity.",
        icon: <FaExchangeAlt />,
    },
    {
        step: "4",
        title: "Yield & Utility",
        description: "Euler holders can stake, earn yield, and access innovative financial tools across DeFi.",
        icon: <FaCoins />,
    },
];
