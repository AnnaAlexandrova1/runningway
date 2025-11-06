import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';


// @ts-ignore
import React from 'react';
// @ts-ignore
import {dynamics} from "../configData/data";
import {IObjecLiteral} from "../interfaces/interfaces";
import {chartColors} from "../configData/stylesData";
import DataTransformService from "../services/DataTransformService";


const DynamicComponent = (props: { dynamics: [], selectPid: string[], legend: IObjecLiteral }) => {
    const dataTransformService = new DataTransformService();
    const {dynamics, selectPid, legend} = props;

    const dynamicsWithoutFirst = (data: any[]) => {
        return data.slice(1)
    }

    const tickXFormatter = (value: string): string => {
        return dataTransformService.tickTransform(value)
    }


    return (
        <div className='diagrams-container'>
            <h3 className="diagrams-name">Динамика позиций</h3>
            <span
                className="diagrams-info">("-1" - не считался чип)</span>
            <div className="w-[90%] md:w-[90%] lg:w-[92%] lg:w-min-[1200px] ml-auto mr-auto">
                <ResponsiveContainer width="100%" height={600}>
                <LineChart
                    margin={{
                        top: 20,
                        left: 20
                    }}
                    data={dynamicsWithoutFirst(dynamics)}
                    className="diagram"

                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="Name"  tickFormatter={tickXFormatter}/>
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
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default DynamicComponent