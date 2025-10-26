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
import {chartColors} from "../configData/stylesData";

const TimeBarChart = (props: { dynamics: IObjecLiteral[], selectedPid: string[], legend: IObjecLiteral }) => {
    const {dynamics, selectedPid, legend} = props

    const dynamicsWithoutFirst = (data: any[]) => {
        return data.slice(1)
    }

    return (
        <div className='diagrams-container'>
            <h3 className="diagrams-name">Среднее время на отрезках</h3>
            <BarChart
                width={Math.max(window.innerWidth * 0.88, 1200)}
                height={500}
                data={dynamicsWithoutFirst(dynamics)}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                className="diagram"
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="Name"/>
                <YAxis/>
                <Tooltip formatter={(value: number, name) => {
                    let newVal = `${Math.floor(value / 60)}:${('0' + (value % 60)).slice(-2)} мин/км`

                    return [newVal, name];
                }}/>
                <Legend/>

                {selectedPid.map((item, i) => {
                        return <Bar key={item} dataKey={`speed${i}`}
                                    name={legend[`fio${i}`]}
                                    fill={chartColors[i]}
                                    activeBar={<Rectangle stroke="blue"/>}/>
                    }
                )}
            </BarChart>
        </div>
    )
}

export default TimeBarChart