"use client";

import Image from "next/image";
import img1 from "../../../public/palace.jpg";
import img2 from "../../../public/Stairs.jpg";
import img3 from "../../../public/library.jpg";
// import graph from "../../../public/fibo-graph.png"; 

// import eth from "../../../public/landing/eth.png";
// import decentralized from "../../../public/landing/decentralized.png";

export default function HowItWorks() {
    return (
        <div className="relative mx-auto font-inter  bg-color1  px-4 pb-20 pt-16 lg:pt-24 md:min-h-screen bg-transparent  overflow-hidden">
            <h2 className="lg:text-5xl md:text-4xl text-3xl font-inter text-center font-bold mb-8 leading-snug text-color2  bg-clip-text ">
                What Makes EulerFi Different
            </h2>
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col gap-20 md:flex-row justify-between items-center h-full pt-6 md:pt-16 mx-auto px-4">
                    <div className="mr-auto place-self-center ">
                        <h1 className="mb-4 max-w-xl text-2xl md:text-3xl font-extrabold leading-none tracking-tight">
                            Revolutionary Endogenous Stability Mechanism
                        </h1>

                        <div>
                            <p className="text-base md:text-xl  lg:mb-8 mb-6 md:max-w-xl font-light text-gray-950 ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                                voluptatum odio, hic nam harum pariatur sequi reprehenderit
                                animi minus dolorum.
                            </p>

                            <p className="text-base md:text-xl  lg:mb-8 mb-6 md:max-w-xl font-light text-gray-950">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                                voluptatum odio, hic nam harum pariatur sequi reprehenderit
                                animi minus dolorum.
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
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse gap-20 justify-between items-center h-full max-w-7xl pt-16 md:pt-28 lg:pt-40 mx-auto px-4">
                    <div className="ml-6 md:ml-12 ">
                        <h1 className="mb-4 max-w-3xl text-2xl md:text-3xl font-extrabold leading-none tracking-tight ">
                            Innovative Governance
                        </h1>

                        <div>
                            <p className="text-base md:text-xl  lg:mb-8 mb-6 md:max-w-xl font-light text-gray-950">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                                voluptatum odio, hic nam harum pariatur sequi reprehenderit
                                animi minus dolorum.
                            </p>

                            <p className="text-base md:text-xl  lg:mb-8 mb-6 md:max-w-xl font-light text-gray-950">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                                voluptatum odio, hic nam harum pariatur sequi reprehenderit
                                animi minus dolorum.
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
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-20 h-full max-w-7xl pt-16 md:pt-28 lg:pt-40 mx-auto px-4">
                    <div className="mr-auto place-self-center ">
                        <h1 className="mb-4 max-w-3xl text-2xl md:text-3xl font-extrabold leading-none tracking-tight">
                            Stable and Predictable growth
                        </h1>

                        <div>
                            <p className="text-base md:text-xl  lg:mb-8 mb-6 md:max-w-xl font-light text-gray-950 ">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                                voluptatum odio, hic nam harum pariatur sequi reprehenderit
                                animi minus dolorum.
                            </p>

                            <p className="text-base md:text-xl  lg:mb-8 mb-6 md:max-w-xl font-light text-gray-950">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius
                                voluptatum odio, hic nam harum pariatur sequi reprehenderit
                                animi minus dolorum.
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
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
