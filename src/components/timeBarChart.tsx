import React from 'react';
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import {IObjecLiteral} from "../interfaces/interfaces";
import {chartColors} from "../services/stylesData";

const TimeBarChart = (props: { dynamics: IObjecLiteral[], selectedPid: string[] }) => {
    const {dynamics, selectedPid} = props
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
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="Name"/>
                <YAxis/>
                <Tooltip/>
                <Legend/>

                {selectedPid.map((item, i) => {
                        return <Bar key={item} dataKey={`speed${i}`} fill={chartColors[i]}
                                    activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                    }
                )}
            </BarChart>
        </div>
    )
}

export default TimeBarChart