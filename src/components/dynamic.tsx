import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// @ts-ignore
import React from 'react';
// @ts-ignore
import {dynamics} from "../services/data";
import {IObjecLiteral} from "../interfaces/interfaces";
import {chartColors} from "../services/stylesData";


const DynamicComponent = (props: { dynamics: [], selectPid: string[], legend: IObjecLiteral }) => {
    const {dynamics, selectPid, legend} = props;

    const dynamicsWithoutFirst = (data: any[]) => {
        return data.slice(1)
    }



    return (
        <div style={{"marginRight": "auto", "marginLeft": "auto", width: 'fit-content'}}>
        <LineChart
            width={1400}
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
            <XAxis dataKey="Name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {selectPid.map((item, i) => {
                    return <Line key={item} type="monotone" dataKey={`position${i}`}
                                 stroke={chartColors[i]}
                                 name={legend[`fio${i}`]}
                    />
                }
            )}
        </LineChart>
        </div>
    );
}

export default DynamicComponent