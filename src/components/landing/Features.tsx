import React from 'react'
import { HoverEffect } from '../ui/card-hover-effect'
import { listOfFeatures } from '@/utils/FeaturesList'

const Features = () => {
    return (
        <section className="w-full lg:py-28 md:py-20 py-16 flex flex-col gap-4 justify-center items-center bg-gradient-to-b from-color2 to-[#0a0a0a]">
            <h1 className="text-color1 font-semibold lg:text-5xl md:text-4xl text-3xl font-inter">What We Offer</h1>
            <div className="max-w-6xl mx-auto px-8">
                <HoverEffect items={listOfFeatures} />
            </div>
        </section>
    )
}

export default Features