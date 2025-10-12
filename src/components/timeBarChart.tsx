import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TimeBarChart = (props: any) => {
    const {dynamics} = props

    const dynamicsWithoutFirst = (data: any[]) => {
        return data.slice(1)
    }
    return (
        <div style={{"marginRight": "auto", "marginLeft": "auto", width: 'fit-content'}}>
        <BarChart
            width={1200}
            height={500}
            data={dynamicsWithoutFirst(dynamics)}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="speed" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            <Bar dataKey="speed2" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
        </div >
    )
}

export default TimeBarChart