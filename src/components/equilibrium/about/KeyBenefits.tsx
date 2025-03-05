import React from 'react'

const KeyBenefits = () => {
    return (
        <section className="w-full md:py-28 py-20 bg-color1 px-4">

            <div className="w-full flex flex-col items-center md:gap-20 gap-10">
                <h2 className="text-color2 md:text-4xl text-3xl font-inter font-semibold">Key Benefits</h2>
                <div className="max-w-6xl flex md:flex-row flex-col md:flex-wrap items-center justify-center md:gap-10 gap-5">
                    {
                        listOfKeyBenefits.map((item, index) => (
                            <div key={index} className="rounded-xl flex flex-col items-start justify-start bg-[#E6D2C0] max-w-[330px] hover:shadow-xl p-6 cursor-pointer group hover:bg-color2 transition-all duration-300">
                                <h1 className='font-marcellus font-extrabold text-7xl text-color2/15 group-hover:text-color1/15 mb-4'>0{index + 1}</h1>
                                <h3 className='text-color2 group-hover:text-color1 text-lg font-inter font-medium mb-1'>{item.title}</h3>
                                <p className="text-color2/80 group-hover:text-color1/80 text-base font-nunitoSans font-light">{item.description}</p>
                            </div>
                        ))
                    }
                </div>
            </div>

        </section>
    )
}

export default KeyBenefits



const listOfKeyBenefits = [
    {
        title: "Mathematically Optimized",
        description: "Automated risk models ensure efficient collateralization.",
        icon: "✅",
    },
    {
        title: "Real-Time Collateral Monitoring",
        description: "Tracks assets 24/7 to prevent liquidation risks.",
        icon: "✅",
    },
    {
        title: "Multi-Asset Collateral Support",
        description: "Diversifies risk by supporting various assets.",
        icon: "✅",
    },
    {
        title: "Dynamic Risk Adjustments",
        description: "Prevents market crashes with adaptive liquidity strategies.",
        icon: "✅",
    },
    {
        title: "Seamless Integration",
        description: "Risk balancing happens automatically for users.",
        icon: "✅",
    }
];

