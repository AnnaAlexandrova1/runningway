import {IObjecLiteral} from "../interfaces/interfaces";
import React from "react";
import {CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {chartColors} from "../configData/stylesData";
import dynamic from "./Dynamic";
import {maxAthlets} from "../configData/data";
import DataTransformService from "../services/DataTransformService";

const GapFromFirstChart = (props: { dynamics: IObjecLiteral[], selectedPid: string[], legend: IObjecLiteral }) => {
    const dataTransformService = new DataTransformService();
    const {dynamics, selectedPid, legend} = props;

    const formatter = (value: number, name) => {
        return [tickFormatter(value), name];
    }


    const tickFormatter = (value: number) => {
        const hours = Math.floor(Math.abs(value) / 3600);
        const minutes = Math.floor((Math.abs(value) % 3600) / 60);
        const secs = Math.abs(value) % 60;
        const pad = (num: number) => num.toString().padStart(2, '0');
        const newVal = `${value < 0 ? '-' : ''}${pad(hours).slice(-2)}:${pad(minutes).slice(-2)}:${pad(secs).slice(-2)}`;

        return newVal;
    }

    const calcWidth = (): number => {
        let width = window.innerWidth;
        return dataTransformService.calcWidth(width)
    }

    function getKeyByValue(object: {}, value: number) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function extractNumber(str) {
        const match = str.match(/\d+/);
        return match ? parseInt(match[0]) : null;
    }

    const gap = (dynamics:IObjecLiteral[]): IObjecLiteral[] => {
        let gapsFinish: string[] = Object.keys(dynamics[dynamics.length - 1]).filter(el => el.includes('chipSeconds'));
        let finish= dynamics[dynamics.length - 1]
        let fastest:number = gapsFinish.reduce((fast,el) => {
            return finish[el] < fast ? finish[el] : fast }, finish['chipSeconds0']
        );
        let fastestOwner = extractNumber(getKeyByValue(finish, fastest));

       let newDynamincs = dynamics.map((item, index) => {
           let i = 0;
           let isLast = true;
           while(isLast && i <= maxAthlets){
               if(item.hasOwnProperty(`chip${i}`)){
                   item[`gap${i}`] = i === Number(fastestOwner) ? 0 : Math.round(item[`chipSeconds${i}`] - item[`chipSeconds${fastestOwner}`])
                   i++
               } else {
                   isLast=false
               }
           }

           return item
       })

        return newDynamincs;
    }

    let gapInfo = gap(dynamics);


    return (<div className='diagrams-container'>
        <h3 className="diagrams-name">Отставание от первого по времени финиша из выборки</h3>
        <span className="diagrams-info">(время по чип-тайму, отрицательное - обгон первого из выборки на отрезке)</span>

        <LineChart
            width={calcWidth()}
            margin={{
                top: 20,
                left: 60      // Увеличиваем для левой оси
            }}
            height={600}
            data={gapInfo}
            className="diagram"
        >
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="NameForChart" domain={[15, 20]} allowDataOverflow/>
            <YAxis minTickGap={2} tickFormatter={tickFormatter}/>
            <Tooltip formatter={formatter}/>
            <Legend/>
            {selectedPid.map((item, i) => {
                    return <Line key={item} type="monotone" dataKey={`gap${i}`}
                                 stroke={chartColors[i]}
                                 name={legend[`fio${i}`]}
                    />
                }
            )}
        </LineChart>
    </div>)
}

export default GapFromFirstChart