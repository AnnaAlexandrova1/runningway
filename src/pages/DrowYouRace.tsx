import {dynamics, dynamics2} from "../services/data";
import DynamicComponent from "../components/dynamic";
import TimeBarChart from "../components/timeBarChart";
import {Button, Form, Input, Select} from 'antd';
import {useState} from "react";
import RaceresultService from "../api/raceresultMethods";
import {IDistanceSelect, IParticipant} from "../interfaces/interfaces";

const {Search} = Input;


const DrowYouRacePage: any = () => {
    const raceresultService = new RaceresultService();
    const [key, setKey] = useState("");
    const [raceId, setRaceId] = useState("");
    const [eventName, setEventName] = useState("");
    const [raceList, setRaceList] = useState([]);
    const [distance, setDistance] = useState<IDistanceSelect[]>([]);
    const [selectedDistance, setSelectedDistance] = useState<string>("");
    const [participants, setParticipants] = useState<IParticipant[]>([])
    const [selectPid, setSelectPid] = useState([])

    const handleInputChange = (e: any) => {
        setRaceId(e.target.value);
    };

    const handleDistanceChange = (e: string) => {
        setSelectedDistance(e)
        setParticipants(transformParticpants(raceList[e]))
    }

    const handleSearch = async () => {
        try {
            const result = await raceresultService.getConfigData(raceId);
            if (result.key) {
                setKey(result.key)
                setEventName(result.eventname)
                const list = await raceresultService.getRaceList(result.key, raceId);
                setRaceList(list.data)
                setDistance(transformDistance(list.data))
            }
        } catch (err) {
            console.error(err)
        }
    }

    const handleParticipantsChange = (e: string[]) => {
        setSelectPid(e)
    }

    const getSplits = async () => {
        try {
            const result = await raceresultService.getSplit(key, raceId, selectPid[0]);
            console.log(result)
        } catch (err) {
            console.error(err)
        }
    }

    const transformParticpants = (participants: []):IParticipant[] => {
           let participantsSelect: IParticipant[] = [];
           participants.forEach(elem => {
              // console.log('elem', elem)
               participantsSelect.push({name: elem[6], number: elem[0], finish: elem[10], pId: elem[1] })
           })
         console.log('partSel', participantsSelect)
        return participantsSelect
    }

    const transformDistance = (list: {}) => {
        let distance = [];
        for (let key in list) {
            distance.push({value: key, label: key.split('_')[1]})
        }

        return distance
    }

    const transformDynamics = (dynamics: any[], dynamics2: any[]): any => {
        return dynamics.map((item: { [key: string]: any }, index: number) => {
            let itemInfo: { [key: string]: any } = {
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
        const [minutes, seconds] = time.replace("min/km", "").trim().split(':').map(Number);
        value = minutes * 60 + seconds
        return value
    }

    return (
        <div className="container">
            <div className={eventName.length === 0 ? '' : 'v-hidden'}>
                <p>Ссылка на гонку</p>
                <Search placeholder="id гонки, например 359948"
                        enterButton="Поиск"
                        size="large"
                        onChange={handleInputChange}
                        onSearch={handleSearch}
                        value={raceId}/>
            </div>

            <div className={eventName.length > 0 ? '' : 'v-hidden'}>
                <h1>{eventName}</h1>

                 <div className={raceList.length === 0 ? 'v-hidden' : ''}>
                     <Form layout="horizontal">
                         {distance.length > 0 &&
                         <Form.Item label="Дистанция">
                             <Select onChange={handleDistanceChange}>
                                 { distance.map((item: IDistanceSelect) => {
                                   return  <Select.Option value={item.value} key={item.value}>{item.label}</Select.Option>
                                     }
                                 ) }
                             </Select>
                         </Form.Item>
                         }

                         <Form.Item>
                             <Select
                                 mode="multiple"
                                 allowClear
                                 style={{ width: '100%' }}
                                 placeholder="Выберите атлетов"
                                 onChange={handleParticipantsChange}
                                 //defaultValue={['a10', 'c12']}
                                 //onChange={handleChange}
                                 //options={options}
                             >   { participants.map((item: IParticipant) => {
                                     return  <Select.Option value={item.pId} key={item.number}>{item.name}</Select.Option>
                                 }
                             ) }

                             </Select>
                         </Form.Item>

                         <Form.Item>
                             <Button onClick={getSplits}>Сравнить</Button>
                         </Form.Item>
                     </Form>
                 </div>
            </div>

            <div className="v-hidden">
                <p>Динамика позиций</p>
                <DynamicComponent dynamics={transformDynamics(dynamics.Splits, dynamics2.Splits)}></DynamicComponent>
                <TimeBarChart dynamics={transformDynamics(dynamics.Splits, dynamics2.Splits)}></TimeBarChart>
            </div>
        </div>
    )
}

export default DrowYouRacePage;