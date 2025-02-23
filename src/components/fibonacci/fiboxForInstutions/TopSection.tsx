import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const TopSection = () => {
    return (
        <section className='w-full pt-36 pb-28 bg-color1 lg:px-20 px-4'>
            <div className="max-w-3xl mx-auto flex flex-col text-center items-center justify-center">
                <h1 className="text-color2 lg:text-[42px] lg:leading-[42px] md:text-4xl text-3xl font-inter font-bold">🏛 Institutional FIBO - Redefining Digital Assets for Institutions with FIBOX</h1>
                <p className="text-color2/80 text-lg font-nunitoSans lg:px-10 font-light mt-2">Unlock institutional-grade financial solutions with FIBO, designed for stability, scalability, and long-term growth.</p>
                <Button className="bg-color5 text-color1 hover:bg-color2 mt-4">Get FIBOX Now</Button>
            </div>
            <div className="max-w-4xl md:h-[450px] h-[350px] mx-auto md:mt-16 mt-8 border-[1px] border-[#E6D2C0] md:p-3 p-1 rounded-xl">
                <Image src="/fiboxbanner.jpg" alt="banner" className="w-full h-full object-cover rounded-xl" width={1000} height={667} quality={100} priority />
            </div>
        </section>
    )
}

export default TopSection