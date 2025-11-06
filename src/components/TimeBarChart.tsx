import React from 'react';
import {
    BarChart,
    Bar,
    Rectangle,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend, ResponsiveContainer,
} from 'recharts';
import {IObjecLiteral} from "../interfaces/interfaces";
import {chartColors} from "../configData/stylesData";
import DataTransformService from "../services/DataTransformService";

const TimeBarChart = (props: { dynamics: IObjecLiteral[], selectedPid: string[], legend: IObjecLiteral }) => {
    const dataTransformService = new DataTransformService();
    const {dynamics, selectedPid, legend} = props;
    const dynamicsWithoutFirst = (data: any[]) => {
        return data.slice(1)
    }
    let newDynamics = dynamicsWithoutFirst(dynamics);

    const tickFormatter = (value: number) => {
        let newVal = `${Math.floor(value / 60)}:${('0' + (value % 60)).slice(-2)} мин/км`
        return newVal;
    }

    const serviceFormatter = (value: number, key?: IObjecLiteral) => {
        if (key && key.dataKey) {
            let number = parseInt(key.dataKey.split("speed")[1])
            let sector = key.payload[`sector${number}`] ?? null;
            let newVal = `${Math.floor(value / 60)}:${('0' + (value % 60)).slice(-2)} мин/км ${sector ? " | " + sector : ""}${number}`

            return newVal.slice(0, -1);
        }
        return '';
    }

    const formatter = (value: number, name: string, key: IObjecLiteral) => {
        return [serviceFormatter(value, key), name];
    }

    return (
        <div className='diagrams-container'>
            <h3 className="diagrams-name">Время и средний темп на отрезках</h3>
            <div className="w-[90%] md:w-[90%] lg:w-[92%] lg:w-min-[1200px] ml-auto mr-auto">
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart
                        data={newDynamics}
                        margin={{
                            top: 20,
                            left: 20     // Увеличиваем для левой оси
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
                    </BarChart></ResponsiveContainer></div>
        </div>
    )
}

export default TimeBarChart