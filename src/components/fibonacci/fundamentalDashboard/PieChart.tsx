'use client'
import React from 'react'
import { Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";

const futureProjectionData = [
    { name: "Buy", value: 50 },
    { name: "Sell", value: 30 },
    { name: "Hold", value: 20 },
];

const COLORS = ["#CC4976", "#7F316D", "#fba064"];

const ProjectionPieChart = () => {
    return (
        <div className="p-4 bg-color0">
            <h2 className="text-xl font-nunitoSans font-semibold text-color2 text-center mb-4">Future Projections (Buy/Sell/Hold)</h2>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie data={futureProjectionData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
                        {futureProjectionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ProjectionPieChart