import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// @ts-ignore
import React from 'react';
// @ts-ignore
import {dynamics} from "../configData/data";
import {IObjecLiteral} from "../interfaces/interfaces";
import {chartColors} from "../configData/stylesData";


const DynamicComponent = (props: { dynamics: [], selectPid: string[], legend: IObjecLiteral }) => {
    const {dynamics, selectPid, legend} = props;

    const dynamicsWithoutFirst = (data: any[]) => {
        return data.slice(1)
    }

    console.log(dynamics)

    return (
        <div className='diagrams-container'>
            <h3 className="diagrams-name">Динамика позиций</h3>
            <LineChart
                width={Math.max(window.innerWidth * 0.88, 1200)}
                height={600}
                data={dynamicsWithoutFirst(dynamics)}
                className="diagram"

            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="NameForChart" domain={[15, 20]} allowDataOverflow/>
                <YAxis minTickGap={2}/>
                <Tooltip/>
                <Legend/>
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