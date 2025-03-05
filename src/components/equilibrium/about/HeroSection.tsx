import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <section className="w-full py-16 bg-color1 grid md:grid-cols-2 gap-4 lg:px-20 px-4">
            <div className="flex flex-col md:order-1 order-2 items-start justify-center">
                <h1 className="text-color2 md:text-6xl text-4xl font-inter font-bold">Achieve Stability with Equilibrium</h1>
                <p className="text-color2/80 text-lg font-nunitoSans font-light mt-4">The Power of Diversification – A mathematically backed risk-balancing system that ensures optimal collateral efficiency and liquidity in EulerFi.</p>
                <Button className="bg-color5 text-color1 hover:bg-color2 mt-4">Explore Analytics</Button>
            </div>
            <div className="w-full md:order-2 order-1">
                <div className="w-full">
                    <Image src="/equilibrium.png" alt="equilibrium" className="w-full" width={2000} height={2000} quality={100} priority />
                </div>
            </div>
        </section>
    )
}

export default HeroSection