import {dynamics, dynamics2} from "../services/data";
import DynamicComponent from "../components/dynamic";
import TimeBarChart from "../components/timeBarChart";

const DrowYouRacePage: any = () => {
    const transformDynamics = (dynamics: any[], dynamics2: any[]): any => {
        return dynamics.map((item: {[key:string]: any}, index: number) => {
            let itemInfo: {[key:string]: any} = {
                name: item.Name,
                position: item.RO,
                position2: dynamics2[index].RO,
                speed: item.Speed ? transformTime(item.Speed) : 0,
                speed2: dynamics2[index].Speed ? transformTime(dynamics2[index].Speed) : 0,
            }

            return itemInfo
        })
    }

    const transformTime = (time: string): number => {
        let value = 0;
        const [ minutes, seconds] = time.replace("min/km", "").trim().split(':').map(Number);
        value = minutes * 60 + seconds
        return value
    }

    return (
        <div>
        <div>
           <p>Динамика позиций</p>
           <DynamicComponent dynamics={transformDynamics(dynamics.Splits, dynamics2.Splits)}></DynamicComponent>
            <TimeBarChart dynamics={transformDynamics(dynamics.Splits, dynamics2.Splits)}></TimeBarChart>
        </div>
        </div>
    )
}

export default DrowYouRacePage;