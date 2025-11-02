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
    const {dynamics, selectedPid, legend} = props;

    const tickFormatter =  (value: number) => {
        let newVal = `${Math.floor(value / 60)}:${('0' + (value % 60)).slice(-2)} мин/км`

        return newVal;
    }

    const formatter = (value: number, name) => {
        return [tickFormatter(value), name];
    }

    const dynamicsWithoutFirst = (data: any[]) => {
        return data.slice(1)
    }

    return (
        <div className='diagrams-container'>
            <h3 className="diagrams-name">Средний темп на отрезках</h3>
            <BarChart
                width={Math.max(window.innerWidth * 0.88, 1200)}
                height={500}
                data={dynamicsWithoutFirst(dynamics)}
                margin={{
                    top: 20,
                    left: 60      // Увеличиваем для левой оси
                }}
                className="diagram"
            >
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="Name"/>
                <YAxis tickFormatter={tickFormatter}/>
                <Tooltip formatter={formatter}/>
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