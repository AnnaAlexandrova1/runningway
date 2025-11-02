import React from "react";
import {IObjecLiteral} from "../interfaces/interfaces";
import {data} from "react-router-dom";

const SectionRatioChart = (props: { dynamics: IObjecLiteral[], selectedPid: string[], legend: IObjecLiteral }) => {
    const {dynamics, selectedPid, legend} = props;

    const dynamicsWithoutFirst = (data: any[]) => {
        return data.slice(1)
    }

    let calcRathio = () => {
        const dynamicsWF = dynamicsWithoutFirst(dynamics);
        let gapsFinish: string[] = Object.keys(dynamics[dynamics.length - 1]).filter(el => el.includes('chipSeconds'));
        let finish= dynamics[dynamics.length - 1]
        let finishValues = gapsFinish.map((el, i) => {
            return {[el]: finish[el]}
        })
        console.log('finish', finishValues)
        console.log('duna', dynamics)
        let consol = dynamicsWF.map((item, index) => {
            finishValues.forEach((elem, elemIndex) => {
                item[`ratio${elemIndex}`] = ((item[`chipSeconds${elemIndex}`] / elem[`chipSeconds${elemIndex}`]) * 100).toFixed(2);
            })

            return item
        })
        console.log(consol)
        return dynamicsWF.map((item, index) => {
           finishValues.forEach((elem, elemIndex) => {
               item[`ratio${elemIndex}`] = Math.round((item[`chipSeconds${elemIndex}`] / elem[`chipSeconds${elemIndex}`]) * 100);
           })

            return item
        })
    }

    const calcValue = calcRathio()

    return (<div className='diagrams-container'>
        <h3 className="diagrams-name">Соотношение времени участка к общему времени дистанции</h3>

        </div>)
}

export default SectionRatioChart;