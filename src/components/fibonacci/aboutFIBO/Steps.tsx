import React from 'react'
import { FaBalanceScale, FaExchangeAlt, FaGem } from 'react-icons/fa'
import { FiBarChart2 } from 'react-icons/fi'

const Steps = () => {
    return (
        <section className='w-full bg-color1 lg:pb-32 pb-28'>
            <h1 className="text-color2 md:text-5xl lg:mb-16 mb-10 text-3xl text-center font-inter font-bold">How FIBO Works</h1>
            <main className='max-w-4xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-10 md:grid-rows-2'>
                <div className="w-full bg-color2 rounded-xl px-8 py-10 flex flex-col items-center justify-center gap-3">
                    <FaGem className="text-7xl text-color1 border-[1px] border-color1/50 p-4 rounded-full" />
                    <h3 className="text-color1 text-center md:text-xl text-lg mt-2 font-inter font-bold">Algorithmic Minting for Scarcity</h3>
                    <p className='text-color1/80 text-base text-center font-nunitoSans font-light'>FIBO tokens are minted through a carefully designed algorithm that ensures a controlled and limited supply. This prevents inflation and maintains its scarcity, making it a valuable digital commodity over time.</p>
                </div>
                <div className="w-full bg-[#E6D2C0] rounded-xl px-8 py-10 flex flex-col items-center justify-center gap-3">
                    <FiBarChart2 className="text-7xl text-color2 border-[1px] border-color2/50 p-4 rounded-full" />
                    <h3 className="text-color2 md:text-xl text-center text-lg mt-2 font-inter font-bold">Predictable Supply Model with Fibonacci Sequences</h3>
                    <p className='text-color2/80 text-base text-center font-nunitoSans font-light'>Unlike traditional assets, FIBO follows a unique supply mechanism based on the Fibonacci sequence. This mathematical structure ensures a predictable issuance pattern, creating confidence among investors and minimizing unexpected fluctuations in supply.</p>
                </div>
                <div className="w-full bg-[#E6D2C0] rounded-xl px-8 py-10 flex flex-col items-center justify-center gap-3">
                    <FaBalanceScale className="text-7xl text-color2 border-[1px] border-color2/50 p-4 rounded-full" />
                    <h3 className="text-color2 text-center md:text-xl text-lg mt-2 font-inter font-bold">Integration with Equilibrium for Stability & Yield</h3>
                    <p className='text-color2/80 text-base text-center font-nunitoSans font-light'>FIBO seamlessly integrates with Equilibrium, a financial framework that enhances stability and offers yield opportunities for holders. This ecosystem enables users to stake, earn, and maintain value stability within the network.</p>
                </div>
                <div className="w-full bg-color2 rounded-xl px-8 py-10 flex flex-col items-center justify-center gap-3">
                    <FaExchangeAlt className="text-7xl text-color1 border-[1px] border-color1/50 p-4 rounded-full" />
                    <h3 className="text-color1 text-center md:text-xl text-lg mt-2 font-inter font-bold">Demand-Supply Optimization for Long-Term Growth</h3>
                    <p className='text-color1/80 text-base text-center font-nunitoSans font-light'>The FIBO system continuously monitors and adjusts the balance between supply and demand. This optimization strategy helps maintain long-term value growth, ensuring that FIBO remains a sustainable and profitable asset for its holders.</p>
                </div>
            </main>
        </section>
    )
}

export default Steps