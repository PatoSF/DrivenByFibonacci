import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const AboutFiboHero = () => {
    return (
        <section className="w-full py-28 bg-color1 grid md:grid-cols-2 gap-4 lg:px-20 px-4">
            <div className="flex flex-col md:order-1 order-2 items-start justify-center">
                <h3 className="text-color5 text-base uppercase font-marcellus font-bold tracking-wider mb-2">About FIBO</h3>
                <h1 className="text-color2 md:text-6xl text-4xl font-inter font-bold">The World&apos;s First Digital Commodity</h1>
                <p className="text-color2/80 text-lg font-nunitoSans font-light mt-4">FIBO is a revolutionary digital asset, engineered for stability, scarcity, and long-term value. Designed using Fibonacci-inspired principles, FIBO offers a unique approach to digital commodities.</p>
                <Button className="bg-color5 text-color1 hover:bg-color2 mt-4">Get FIBO Now</Button>
            </div>
            <div className="w-full md:order-2 order-1">
                <div className="w-full">
                    <Image src="/Coins.svg" alt="coins" className="w-full" width={500} height={500} quality={100} priority />
                </div>
            </div>
        </section>
    )
}

export default AboutFiboHero