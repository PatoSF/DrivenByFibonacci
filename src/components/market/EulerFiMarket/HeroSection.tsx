import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const HeroSection = () => {
    return (
        <section className="w-full py-16 bg-color1 grid md:grid-cols-2 gap-4 lg:px-20 px-4">
            <div className="flex flex-col md:order-1 order-2 items-start justify-center">
                <h1 className="text-color2 md:text-6xl text-4xl font-inter font-bold">EulerFi&apos;s Market</h1>
                <h3 className="text-color2 md:text-3xl text-2xl font-inter font-semibold">Trade with Confidence in a Decentralized Environment</h3>
                <p className="text-color2/80 text-lg font-nunitoSans font-light mt-4">A dedicated trading platform where cutting-edge DeFi meets institutional-grade reliability. Experience real-time trading, deep liquidity, and comprehensive market insights designed to empower your financial decisions.</p>
                <Link href="/dashboard">
                    <Button className="bg-color5 text-color1 hover:bg-color2 mt-4">Start Trading</Button>
                </Link>
            </div>
            <div className="w-full md:order-2 order-1">
                <div className="w-full">
                    <Image src="/insidemarket.png" alt="equilibrium" className="w-full" width={2000} height={2000} quality={100} priority />
                </div>
            </div>
        </section>
    )
}

export default HeroSection