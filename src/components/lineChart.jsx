import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const LineGraph = ({ results, setResults }) => {

    const chartData = results.map((result, index) => ({
        // name: convertToAD(result.date),
        score: result.score,
        fullmark: result.fullmark,
    }));

    return (
        <div className="mt-8 lg:mt-32 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-center mb-5">Score Progress Over Time</h2>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="score" stroke="#8884d8" />
                    <Line type="monotone" dataKey="fullmark" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default LineGraph
