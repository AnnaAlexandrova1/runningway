import React from "react";
import {IObjecLiteral} from "../interfaces/interfaces";
import {data} from "react-router-dom";
import {Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis} from "recharts";
import {chartColors} from "../configData/stylesData";
import DataTransformService from "../services/DataTransformService";

const SectionRatioChart = (props: { dynamics: IObjecLiteral[], selectedPid: string[], legend: IObjecLiteral }) => {
    const dataTransformService = new DataTransformService();
    const {dynamics, selectedPid, legend} = props;

    const tickFormatter =  (value: number) => {
        return value + "%";
    }

    const dynamicsWithoutFirst = (data: any[]) => {
        return data.slice(1)
    }

    let calcRathio = () => {
        const dynamicsWF = dynamicsWithoutFirst(dynamics);
        let gapsFinish: string[] = Object.keys(dynamics[dynamics.length - 1]).filter(el => el.includes('chipSeconds'));
        let finish = dynamics[dynamics.length - 1]
        let finishValues = gapsFinish.map((el, i) => {
            return {[el]: finish[el]}
        })

        return dynamicsWF.map((item, index) => {
            finishValues.forEach((elem, elemIndex) => {
                item[`ratio${elemIndex}`] = Number(((item[`sectorSeconds${elemIndex}`] / elem[`chipSeconds${elemIndex}`]) * 100).toFixed(2));
            })

            return item
        })
    }

    let calcData = calcRathio()
    const calcWidth = (): number => {
        let width = window.innerWidth;
        return dataTransformService.calcWidth(width)
    }

    return (<div className='diagrams-container'>
        <h3 className="diagrams-name">Время участка к общему времени дистанции</h3>
        <span className="diagrams-info">(соотношение в % времени сегмента к времени преодоления всей дистанции)</span>
        <BarChart
            width={calcWidth()}
            height={500}
            data={calcRathio()}
            margin={{
                top: 20,
                left: 60      // Увеличиваем для левой оси
            }}
            className="diagram"
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="Name"/>
            <YAxis tickFormatter={tickFormatter}/>
            <Tooltip formatter={tickFormatter}/>
            <Legend/>

            {selectedPid.map((item, i) => {
                    return <Bar key={item} dataKey={`ratio${i}`}
                                name={legend[`fio${i}`]}
                                fill={chartColors[i]}
                                activeBar={<Rectangle stroke="blue"/>}/>
                }
            )}
        </BarChart>
    </div>)
}

export default SectionRatioChart;