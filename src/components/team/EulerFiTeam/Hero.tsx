import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <section className="w-full md:h-[400px] h-[500px] relative">
            <div className='w-full h-full'>
                <Image src="/eulerteam.jpg" alt="banner" className="w-full h-full object-cover" width={1000} height={562} quality={100} priority />
            </div>
            <div className='absolute top-0 left-0 w-full h-full bg-gradient-to-t from-color2 to-color2/50 flex flex-col items-center justify-end md:pb-8 pb-12 px-4 md:px-0'>
                <h1 className="font-inter text-center text-color1/90 text-3xl md:text-5xl font-semibold">Meet the Minds Behind EulerFi</h1>
                <h3 className="font-nunitoSans font-bold text-xl md:text-2xl text-color1/90 mt-1 mb-4 text-center">Innovation, Expertise, and Dedication Powering the Future of Finance</h3>
                <p className='max-w-2xl text-center font-nunitoSans text-base md:text-lg text-color1/70'>EulerFi is built by a team of visionary developers, researchers, and strategists committed to revolutionizing decentralized finance. Our expertise spans blockchain engineering, risk modeling, and tokenomics—ensuring a robust and secure financial ecosystem</p>
            </div>
        </section>
    )
}

export default Hero