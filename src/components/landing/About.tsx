import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const About = () => {
    return (
        <section className="w-full lg:h-screen h-auto grid md:grid-cols-2 bg-color2">
            <main className="w-full lg:h-full md:h-auto h-[400px] flex justify-center items-center relative z-0">
                <Image src="/patternpad.svg" alt="pattern" className="w-full h-full object-cover opacity-20" width={1000} height={700} quality={100} priority />
                <div className="w-full h-full absolute inset-0 z-10 flex justify-center items-center">
                    <div className="lg:w-[400px] lg:h-[400px] md:w-[300px] md:h-[300px] w-[250px] h-[250px] rounded-full bg-color2 flex justify-center items-center">
                        <div className="md:w-[200px] w-[150px]">
                            <Image src="/fibo-logo.png" alt='Fibonacci Logo' className='w-full' width={955} height={1060} quality={100} priority />
                        </div>
                    </div>
                </div>
            </main>
            <main className="flex flex-col py-16 lg:py-0 justify-center items-start gap-4 px-4 md:px-8 lg:px-10">
                <h1 className="xl:text-6xl lg:text-5xl text-3xl text-color1 font-inter font-bold">Precision in Motion: The Fibonacci Advantage</h1>
                <p className='lg:text-lg text-base font-nunitoSans text-color1/90'>EulerFi is built on the timeless principles of mathematical harmony, transforming patterns into actionable insights. By leveraging the power of Fibonacci sequences, we create a seamless flow where structure meets adaptability, ensuring stability even in dynamic environments. Every calculation is a step toward precision, every trend a reflection of natural order—unveiling opportunities with unwavering consistency.</p>

                <Button variant={'outline'} className="bg-color2 border-color5 text-color5 transition-all duration-200 hover:bg-color5 hover:text-color1">Leran More</Button>
            </main>
        </section>
    )
}

export default About