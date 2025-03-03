import React from 'react'
import { FaGlobe, FaBullseye } from "react-icons/fa";


const EulerVision = () => {
    return (
        <section className='w-full bg-color1 md:py-28 py-20 px-4 md:px-0'>
            <h1 className="text-color2 md:text-4xl lg:mb-10 mb-6 text-2xl text-center font-inter font-bold">Our Vision & Mission</h1>
            <main className='max-w-4xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-10'>
                <div className="w-full bg-color2 rounded-xl px-8 py-10 flex flex-col items-center justify-center gap-3">
                    <FaGlobe className="text-7xl text-color1 border-[1px] border-color1/50 p-4 rounded-full" />
                    <h3 className="text-color1 text-center md:text-xl text-lg mt-2 font-inter font-bold">Vision Statement</h3>
                    <p className='text-color1/80 text-base text-center font-nunitoSans font-light'>Empowering a decentralized financial future where transparency, security, and accessibility drive global financial inclusion.</p>
                </div>
                <div className="w-full bg-[#E6D2C0] rounded-xl px-8 py-10 flex flex-col items-center justify-center gap-3">
                    <FaBullseye className="text-7xl text-color2 border-[1px] border-color2/50 p-4 rounded-full" />
                    <h3 className="text-color2 md:text-xl text-center text-lg mt-2 font-inter font-bold">Mission Statement</h3>
                    <p className='text-color2/80 text-base text-center font-nunitoSans font-light'>At EulerFi, our mission is to build a robust DeFi ecosystem leveraging innovative financial models, risk-optimized lending protocols, and cutting-edge blockchain solutions.</p>
                </div>

            </main>
        </section>
    )
}

export default EulerVision