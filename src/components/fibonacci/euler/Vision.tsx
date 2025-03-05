import React from 'react'
import Image from 'next/image';

const Vision = () => {
    return (
        <div className="max-w-6xl mx-auto mb-20">
            <div className="flex flex-col md:gap-20 gap-8 md:flex-row justify-between items-center h-full pt-6 md:pt-16 mx-auto px-4">
                <div className="mr-auto place-self-center ">
                    <h1 className="mb-4 max-w-xl text-2xl md:text-4xl font-bold leading-none ">
                        The Euler Vision - A Stable Financial Layer
                    </h1>

                    <div>
                        <p className="text-base md:text-xl font-nunitoSans lg:mb-8 mb-6 md:max-w-xl font-light text-gray-950 ">
                            EulerFi is a protocol built to redefine financial stability using algorithmic precision.
                        </p>
                        <ul className="list-disc list-inside flex flex-col gap-1.5 text-base md:text-lg">
                            <li className=' font-nunitoSans md:max-w-xl font-light text-gray-950'>Mathematical Integrity - Inspired by Euler&apos;s groundbreaking formulas for optimized stability.</li>
                            <li className=' font-nunitoSans md:max-w-xl font-light text-gray-950'>Decentralized Reserves - Fully backed by programmatic mechanisms, minimizing volatility.</li>
                            <li className=' font-nunitoSans md:max-w-xl font-light text-gray-950'>Institutional-Grade Liquidity - Designed to integrate seamlessly with DeFi, TradFi, and global financial markets.</li>
                        </ul>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute aspect-square bg-[#FFBE7B] rounded-full blur-[122px] flex-none left-1/2 top-[37px] -translate-x-1/2 w-[85%]"></div>
                    <div className="relative">
                        <Image
                            src="/1.webp"
                            alt="Image"
                            width={400}
                            height={400}
                            className="w-full rounded-xl"
                        />
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row-reverse gap-20 justify-between items-center h-full max-w-7xl pt-16 md:pt-28 lg:pt-40 mx-auto px-4">
                <div className="ml-6 md:ml-12 ">
                    <h1 className="mb-4 max-w-xl text-2xl md:text-4xl font-bold leading-none ">
                        Euler Stablecoin: The Future of Money
                    </h1>

                    <div>
                        <p className="text-base md:text-xl font-nunitoSans lg:mb-8 mb-6 md:max-w-xl font-light text-gray-950">
                            EulerFi introduces a mathematically predictable stable asset optimized for:
                        </p>

                        <ul className="list-disc list-inside flex flex-col gap-1.5 text-base md:text-lg">
                            <li className='font-nunitoSans md:max-w-xl font-light text-gray-950'>Institutions & Enterprises - Compliance-ready and capital-efficient.</li>
                            <li className='font-nunitoSans md:max-w-xl font-light text-gray-950'>DeFi & On-Chain Finance - Collateralized lending, trading, and liquidity management.</li>
                            <li className='font-nunitoSans md:max-w-xl font-light text-gray-950'>Global Adoption - Borderless, censorship-resistant, and designed for long-term sustainability.</li>
                        </ul>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute aspect-square bg-[#A07CFE] rounded-full blur-[122px] flex-none left-1/2 top-[37px] -translate-x-1/2 w-[85%]"></div>
                    <div className="relative">
                        <Image
                            src="/2.webp"
                            alt="Image"
                            width={400}
                            height={400}
                            className="w-full rounded-xl"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vision