import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const WhatIsEquil = () => {
    return (
        <section className="w-full xl:h-[600px] lg:h-[550px]  h-auto grid md:grid-cols-2 bg-color2">
            <main className="w-full lg:h-full md:h-auto h-[400px] flex justify-center items-center relative z-0 overflow-hidden">
                <Image src="/patternpad.svg" alt="pattern" className="w-full h-full object-cover opacity-100" width={1000} height={700} quality={100} priority />
                <div className="w-full h-full absolute inset-0 z-10 flex justify-center items-center">
                    <div className="lg:w-[250px] lg:h-[250px] md:w-[200px] md:h-[200px] w-[250px] h-[250px] rounded-full bg-color0 flex justify-center items-center">
                        <div className="text-color2 font-sora font-bold lg:text-5xl md:text-4xl text-3xl">$EQBL</div>
                    </div>
                </div>
            </main>
            <main className="lg:h-full md:h-auto flex flex-col py-16 lg:py-0 justify-center items-start gap-4 px-4 md:px-8 lg:px-10">
                <h1 className="xl:text-6xl lg:text-5xl text-3xl text-color1 font-inter font-bold">What is Equilibrium?</h1>
                <p className='lg:text-lg text-base font-nunitoSans text-color1/90'>Equilibrium is EulerFi&pos;s automated collateral management engine, designed to ensure market resilience, reduce liquidation risks, and optimize asset utilization.</p>
                <p className='lg:text-lg text-base font-nunitoSans text-color1/90'>By leveraging mathematical models and real-time monitoring, Equilibrium dynamically adjusts collateral to maintain a stable and sustainable ecosystem.</p>

                <Button variant={'outline'} className="bg-color2 border-color5 text-color5 transition-all duration-200 hover:bg-color5 hover:text-color1">Explore Now</Button>
            </main>
        </section>
    )
}

export default WhatIsEquil