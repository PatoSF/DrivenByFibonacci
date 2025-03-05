'use client'
import React from 'react'
import { XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

const liquidationData = [
    { name: "Week 1", FIBO: 300000, EQBL: 100000 },
    { name: "Week 2", FIBO: 250000, EQBL: 90000 },
    { name: "Week 3", FIBO: 400000, EQBL: 120000 },
    { name: "Week 4", FIBO: 350000, EQBL: 110000 },
];

const LiquidationLineChart = () => {
    return (
        <div className="px-4 py-8 bg-color0">
            <h2 className="text-xl font-nunitoSans font-semibold text-color2 text-center mb-4">Purchasing Power</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={liquidationData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="FIBO" stroke="#CC4976" />
                    <Line type="monotone" dataKey="EQBL" stroke="#7f316d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LiquidationLineChart