import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const About = () => {
    return (
        <section className="w-full pb-20 bg-color1 grid md:grid-cols-2 gap-4 lg:gap-10 lg:px-16 px-4">
            <div className="w-full">
                <div className="w-full">
                    <Image src="/cryptoportfolio.svg" alt="coins" className="w-full" width={500} height={500} quality={100} priority />
                </div>
            </div>
            <div className="flex flex-col items-start justify-center">
                <h1 className="text-color2 md:text-5xl text-3xl font-inter font-bold">What is FIBO?</h1>
                <ul className="mt-4 list-disc flex flex-col gap-1.5">
                    <li className="text-color2/80 text-lg font-nunitoSans font-light">FIBO is a new class of digital asset designed with mathematical precision and economic stability in mind.</li>
                    <li className="text-color2/80 text-lg font-nunitoSans font-light">Inspired by Fibonacci sequences, FIBO maintains scarcity, ensuring predictable supply growth and resistance to inflation.</li>
                    <li className="text-color2/80 text-lg font-nunitoSans font-light">Unlike traditional cryptocurrencies, FIBO is not just a store of value—it&apos;s an algorithmic digital commodity designed to bridge finance, technology, and mathematical innovation.</li>
                </ul>

                <Button className="bg-color2 text-color1 mt-4">Get FIBO Now</Button>
            </div>

        </section>
    )
}

export default About