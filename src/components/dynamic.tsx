import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// @ts-ignore
import React from 'react';
// @ts-ignore
import {dynamics} from "../services/data";


const DynamicComponent = (props: any) => {
    const {dynamics} = props;

    console.log(dynamics.Splits)
    return (
        <div style={{"marginRight": "auto", "marginLeft": "auto", width: 'fit-content'}}>
        <LineChart
            width={1400}
            height={500}
            data={dynamics}
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
            <Line type="monotone" dataKey="position" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="position2" stroke="#82ca9d" />
        </LineChart>
        </div>
    );
}

export default DynamicComponent