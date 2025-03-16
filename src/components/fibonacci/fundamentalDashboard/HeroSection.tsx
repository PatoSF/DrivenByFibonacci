import Image from 'next/image'
import React from 'react'

const HeroSection = () => {
    return (
        <section className="w-full md:h-[500px] h-[500px] relative">
            <div className='w-full h-full'>
                <Image src="/fundaDash.jpg" alt="banner" className="w-full h-full object-cover" width={3000} height={2000} quality={100} priority />
            </div>
            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black to-transparent flex flex-col items-center justify-center px-4 md:px-0'>
                <h1 className="font-inter text-center text-color1/90 text-3xl md:text-5xl font-semibold">Fundamental Dashboard</h1>
                <h3 className="font-nunitoSans font-bold text-xl md:text-2xl text-color1/90 mt-1 mb-4 text-center">Data-driven insights for optimized financial strategies</h3>
                <p className='max-w-2xl text-center font-nunitoSans text-base md:text-lg text-color1/70'>Stay ahead of the market with EulerFi&apos;s real-time analytics. Gain deep insights into key financial metrics, risk models, asset performance, and collateralization efficiency - all in one place.</p>
            </div>
        </section>
    )
}

export default HeroSection