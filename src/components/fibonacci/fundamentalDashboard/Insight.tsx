import React from 'react'
import PriceBarChart from './BarChart'
import LiquidationLineChart from './LineChart'

const Insight = () => {
    return (
        <section className="w-full bg-color1 md:pb-28 pb-20 px-4 md:px-0">
            <h1 className="text-color2 md:text-4xl mb-2 text-3xl text-center font-inter font-bold">Insights & Analysis</h1>

            <main className="max-w-5xl mx-auto grid md:grid-cols-2 grid-cols-1 md:gap-16 gap-5  mt-10">

                <div className="w-full">
                    <PriceBarChart />
                </div>

                <div className="w-full">
                    <LiquidationLineChart />
                </div>
            </main>

        </section>
    )
}

export default Insight