'use client'
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const priceData = [
    { name: "Jan", FIBO: 1.85, EQBL: 1.62 },
    { name: "Feb", FIBO: 1.92, EQBL: 1.58 },
    { name: "Mar", FIBO: 2.05, EQBL: 1.63 },
    { name: "Apr", FIBO: 2.10, EQBL: 1.59 },
    { name: "May", FIBO: 2.15, EQBL: 1.61 },
];

const PriceBarChart = () => {
    return (
        <div className="px-4 font-nunitoSans py-8 bg-color0 ">
            <h2 className="text-xl font-nunitoSans font-semibold text-color2 text-center mb-4">Total Supply ($FIBO vs $EQBL)</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priceData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="FIBO" fill="#CC4976" />
                    <Bar dataKey="EQBL" fill="#7f316d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PriceBarChart