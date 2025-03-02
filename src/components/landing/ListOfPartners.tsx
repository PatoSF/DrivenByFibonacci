'use client'
import Image from 'next/image';
import React from 'react'
import Marquee from "react-fast-marquee";

const ListOfPartners = () => {
    return (
        <section className="w-full my-10">
            <div className="w-full relative bg-color1 h-[65px] before:absolute before:left-0 before:top-0 lg:before:w-[30%] md:before:w-[230px] before:w-[83px] before:h-full before:bg-gradient-to-r before:from-color1 before:via-color1 before:to-color1/10 before:z-10 after:absolute after:right-0 after:top-0 lg:after:w-[30%] md:after:w-[230px] after:w-[83px] after:h-full after:bg-gradient-to-l after:from-color1 after:via-color1 after:to-color1/10 after:z-10">
                <Marquee className="h-full" pauseOnHover={false}>
                    <section className="flex items-center gap-14">
                        {/* BlackRock */}
                        <div className="h-full w-[150px] flex items-center justify-center">
                            <Image src="/partners/blackrock.svg" className="object-contain" alt="BlackRock logo" width={185} height={27} quality={100} priority />
                        </div>
                        {/* BNY Mellon */}
                        <div className="h-full w-[160px] flex items-center justify-center">
                            <Image src="/partners/bnyMellon.svg" className="object-contain" alt="BNY Mellon logo" width={207} height={27} quality={100} priority />
                        </div>
                        {/* Chainlink */}
                        <div className="h-full w-[180px] flex items-center justify-center">
                            <Image src="/partners/chainlink.png" className="object-contain" alt="Chainlink logo" width={1024} height={315} quality={100} priority />
                        </div>
                        {/* Circle */}
                        <div className="h-full w-[170px] flex items-center justify-center">
                            <Image src="/partners/circle.png" className="object-contain" alt="Circle logo" width={934} height={240} quality={100} priority />
                        </div>
                        {/* Coinbase */}
                        <div className="h-full w-[140px] flex items-center justify-center">
                            <Image src="/partners/coinbase.svg" className="object-contain" alt="Coinbase logo" width={147} height={27} quality={100} priority />
                        </div>
                        {/* Grab */}
                        <div className="h-full w-[130px] flex items-center justify-center">
                            <Image src="/partners/grab.svg" className="object-contain" alt="Grab logo" width={110} height={39} quality={100} priority />
                        </div>
                        {/* MoneyGram */}
                        <div className="h-full w-[160px] flex items-center justify-center">
                            <Image src="/partners/moneyGram.svg" className="object-contain" alt="MoneyGram logo" width={189} height={39} quality={100} priority />
                        </div>
                        {/* Scroll */}
                        <div className="h-full w-[120px] flex items-center justify-center">
                            <Image src="/partners/scroll.svg" className="object-contain" alt="Scroll logo" width={81} height={24} quality={100} priority />
                        </div>
                        {/* Visa */}
                        <div className="h-full w-[140px] flex items-center justify-center mr-12">
                            <Image src="/partners/visa.svg" className="object-contain" alt="Visa logo" width={99} height={33} quality={100} priority />
                        </div>
                    </section>
                </Marquee>
            </div>
        </section>
    )
}

export default ListOfPartners