import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const TopSection = () => {
    return (
        <section className='w-full pt-20 pb-28 bg-color1 lg:px-20 px-4'>
            <div className="max-w-4xl md:h-[450px] h-[350px] mx-auto md:mt-16 mt-8 border-[1px] border-[#E6D2C0] bg-[#E6D2C0] md:p-3 p-1 rounded-xl">
                <Image src="/euler.jpg" alt="banner" className="w-full h-full object-cover rounded-xl" width={1000} height={667} quality={100} priority />
            </div>
            <div className="max-w-3xl mx-auto mt-4 flex flex-col text-center items-center justify-center gap-3">
                <h1 className="text-color2 lg:text-[42px] lg:leading-[42px] md:text-4xl text-3xl font-inter font-bold">Euler - The Future of Algorithmic Stability</h1>
                <p className="text-color2/80 text-lg font-nunitoSans lg:px-10 font-light">A mathematically optimized stable asset designed for institutions, investors, and DeFi innovators seeking financial autonomy.</p>
                <Button className="bg-color5 text-color1 hover:bg-color2 ">Discover Euler</Button>
            </div>
        </section>
    )
}

export default TopSection