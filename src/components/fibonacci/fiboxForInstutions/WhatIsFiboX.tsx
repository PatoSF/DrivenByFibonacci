import React from 'react'

const WhatIsFiboX = () => {
    return (
        <section className="w-full md:pb-28 pb-20 bg-color1 px-4">
            <main className="max-w-6xl mx-auto bg-color2 rounded-2xl lg:p-10 p-6">
                <div className="flex md:flex-row flex-col md:justify-between lg:gap-0 gap-6">
                    <h1 className="max-w-sm text-color1 md:text-5xl text-3xl font-inter font-bold">What is Institutional FIBO?</h1>
                    <div className="max-w-md flex flex-col gap-2">
                        <p className="text-color1/80 text-lg font-nunitoSans font-light">Institutional FIBO, also known as FIBOX, is designed specifically for financial institutions, hedge funds, and large-scale investors seeking exposure to a mathematically-driven digital commodity.</p>
                        <p className="text-color1/80 text-lg font-nunitoSans font-light">Built on predictable Fibonacci supply mechanics, it ensures scarcity, stability, and integration with existing financial frameworks.</p>
                    </div>
                </div>

                <div className="w-full flex flex-col md:gap-20 gap-10 md:mt-20 mt-10">
                    <h2 className="text-color1 md:text-2xl text-xl font-sora font-medium">Key Features</h2>
                    <div className="w-full grid lg:grid-cols-4 lg:gap-6 md:grid-cols-2 md:gap-10 gap-5">
                        {
                            institutionalFiboFeatures.map((item, index) => (
                                <div key={index} className="rounded-xl flex flex-col items-start justify-start hover:shadow-xl">
                                    <h1 className='font-marcellus font-extrabold text-7xl text-color1/60 mb-4'>0{index + 1}</h1>
                                    <h3 className='text-color1 text-lg font-inter mb-1'>{item.title}</h3>
                                    <p className="text-color1/80 text-base font-nunitoSans font-light">{item.description}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </main>
        </section>
    )
}

export default WhatIsFiboX

const institutionalFiboFeatures = [
    {
        title: "Predictable Supply Model",
        description: "Fibonacci-sequence-based issuance for long-term price predictability.",
    },
    {
        title: "Enterprise-Grade Security",
        description: "Compliance-ready and institutionally backed custody solutions.",
    },
    {
        title: "Liquidity & Market Access",
        description: "Seamless integration with top exchanges and financial platforms.",
    },
    {
        title: "Yield & Staking Mechanisms",
        description: "Institutional staking options to generate yield on holdings.",
    },
];
