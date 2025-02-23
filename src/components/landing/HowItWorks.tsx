"use client";

import Image from "next/image";
import img1 from "../../../public/palace.jpg";
import img2 from "../../../public/Stairs.jpg";
import img3 from "../../../public/library.jpg";

export default function HowItWorks() {
    return (
        <div className="relative mx-auto font-inter bg-[#E6D2C0]  px-4 py-20 lg:py-24 md:min-h-screen overflow-hidden">
            <h2 className="lg:text-5xl md:text-4xl text-3xl font-inter text-center font-bold mb-8 leading-snug text-color2  bg-clip-text ">
                What Makes EulerFi Different
            </h2>
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:gap-20 gap-8 md:flex-row justify-between items-center h-full pt-6 md:pt-16 mx-auto px-4">
                    <div className="mr-auto place-self-center ">
                        <h1 className="mb-4 max-w-xl text-2xl md:text-4xl font-bold leading-none ">
                            Revolutionary Endogenous Stability Mechanism
                        </h1>

                        <div>
                            <p className="text-base md:text-xl font-nunitoSans lg:mb-8 mb-6 md:max-w-xl font-light text-gray-950 ">
                                EulerFi introduces a novel endogenous stability model, ensuring that its stablecoins maintain value
                                through algorithmic mechanisms rather than relying solely on external reserves. This innovative approach
                                minimizes reliance on volatile assets while maintaining a robust peg.
                            </p>

                            <p className="text-base md:text-xl font-nunitoSans lg:mb-8 mb-6 md:max-w-xl font-light text-gray-950">
                                By leveraging on-chain economic principles, EulerFi creates a self-sustaining system that dynamically
                                adjusts supply and demand to maintain stability. Unlike traditional stablecoins that depend on centralized
                                collateral, EulerFi&apos;s model enhances decentralization, transparency, and resilience against market shocks.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute aspect-square bg-[#FFBE7B] rounded-full blur-[122px] flex-none left-1/2 top-[37px] -translate-x-1/2 w-[85%]"></div>
                        <div className="relative">
                            <Image
                                src={img1}
                                alt=""
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
                            Innovative Governance
                        </h1>

                        <div>
                            <p className="text-base md:text-xl font-nunitoSans lg:mb-8 mb-6 md:max-w-xl font-light text-gray-950">
                                EulerFi pioneers a decentralized governance model, ensuring that protocol decisions are
                                made transparently and collectively by the community. Through on-chain voting and quadratic governance,
                                stakeholders have a direct say in key protocol upgrades and economic policies.
                            </p>

                            <p className="text-base md:text-xl font-nunitoSans lg:mb-8 mb-6 md:max-w-xl font-light text-gray-950">
                                By leveraging token-weighted decision-making, EulerFi prevents governance centralization
                                while promoting active participation. This democratic structure fosters sustainability, adaptability,
                                and trust within the ecosystem, empowering users to shape the future of decentralized finance.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute aspect-square bg-[#A07CFE] rounded-full blur-[122px] flex-none left-1/2 top-[37px] -translate-x-1/2 w-[85%]"></div>
                        <div className="relative">
                            <Image
                                src={img2}
                                alt=""
                                width={400}
                                height={400}
                                className="w-full rounded-xl"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-20 h-full max-w-7xl pt-16 md:pt-28 lg:pt-40 mx-auto px-4">
                    <div className="mr-auto place-self-center ">
                        <h1 className="mb-4 max-w-xl text-2xl md:text-4xl font-bold leading-none">
                            Stable and Predictable growth
                        </h1>

                        <div>
                            <p className="text-base md:text-xl font-nunitoSans lg:mb-8 mb-6 md:max-w-xl font-light text-gray-950 ">
                                EulerFi is designed to ensure long-term stability and sustainable growth by integrating
                                algorithmic mechanisms that balance market fluctuations. By leveraging Fibonacci-inspired
                                economic models, the protocol maintains an optimal supply-demand equilibrium, reducing volatility.
                            </p>

                            <p className="text-base md:text-xl font-nunitoSans lg:mb-8 mb-6 md:max-w-xl font-light text-gray-950">
                                Through automated rebalancing and strategic liquidity incentives, EulerFi fosters predictable
                                expansion, making it an attractive platform for both retail and institutional investors.
                                This approach enhances capital efficiency while securing a resilient financial ecosystem.
                            </p>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="absolute aspect-square bg-[#ffafcb]/70 rounded-full blur-[102px] flex-none left-1/2 top-[37px] -translate-x-1/2 w-[85%]"></div>
                        <div className="relative">
                            <Image
                                src={img3}
                                alt=""
                                width={450}
                                className="w-full rounded-xl"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
