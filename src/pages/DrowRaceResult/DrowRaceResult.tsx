import DynamicComponent from "../../components/dynamic";
import TimeBarChart from "../../components/timeBarChart";
import {Button, Form, Input, Select, Radio} from 'antd';
import {useReducer, useState} from "react";
import RaceresultService from "../../api/raceresultMethods";
import {IDistanceSelect, ILabelValue, IObjecLiteral, IParticipant, IRaceResultState} from "../../interfaces/interfaces";
import {initialRaseResultState, raceResultReducer} from "./state";
import {genderList} from "../../services/data";

const {Search} = Input;


const DrowRaceResult: any = () => {
    const raceresultService = new RaceresultService();
    const [state, dispatch] = useReducer(raceResultReducer, initialRaseResultState);

    const [raceList, setRaceList] = useState([]);
    const [distance, setDistance] = useState<IDistanceSelect[]>([]);
    const [participants, setParticipants] = useState<IParticipant[]>([])
    const [selectPid, setSelectPid] = useState<string[]>([]);
    const [splits, setSplit] = useState<{}>([]);
    const [finalSplits, setFinalSplits] = useState<IObjecLiteral[]>([]);


    const setField = (field: keyof IRaceResultState, value: any) => {
        dispatch({ type: 'SET_FIELD', payload: { field, value } });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: "SET_RACE_ID", payload: { raceId: e.target.value } });
    };

    const handleDistanceChange = (e: string) => {
        setParticipants(transformParticpants(raceList[e]))
    }

    const handleChangeGender = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setField('selectGender', e.target.value)
    }

    const handleSearch = async () => {
        let localData = localStorage.getItem(state.raceId);
        if (!localData) {
            try {
                const result = await raceresultService.getConfigData(state.raceId);
                if (result.key) {
                    setField('key', result.key);
                    setField('eventName', result.eventname)
                    const list = await raceresultService.getRaceList(result.key, state.raceId);
                    setRaceList(list.data)
                    setDistance(transformDistance(list.data))
                    const localStorageData = {
                        key: result.key,
                        eventName: result.eventname,
                        distance: transformDistance(list.data),
                        listData: list.data
                    };
                    localStorage.setItem(state.raceId, JSON.stringify(localStorageData));
                }
            } catch (err) {
                console.error(err)
            }
        } else {
            const localStorageData = JSON.parse(localStorage.getItem(state.raceId));
            setField('key', localStorageData.key);
            setField('eventName', localStorageData.eventName)
            setRaceList(localStorageData.listData);
            setDistance(localStorageData.distance);
        }
    }

    const handleParticipantsChange = (e: string[]) => {
        setSelectPid(e)
    }

    const getSplits = async () => {
        const requests = selectPid.map((elem, index) => {
            return {
                key: `${index}`,
                fn: () => fetch(`https://my1.raceresult.com/${state.raceId}/RRPublish/data/splits?key=${state.key}&pid=${elem}`).then(r => r.json())
            }
        })


        try {
            const finalResults: IObjecLiteral = await requests.reduce(async (previousPromise, {key, fn}) => {
                const accumulatedResults = await previousPromise;
                const result: { Splits: any[] } = await fn();

                setSplit(prev => ({...prev, [key]: result}));


                // Возвращаем накопленные результаты для следующего шага
                return {...accumulatedResults, [key]: result.Splits};
            }, Promise.resolve({}))


            let finalSplits = [];
            for (let k in finalResults) {
                finalSplits.push(finalResults[k])
            }
            setFinalSplits(finalSplits)
        } catch (err) {
            console.error(err)
        }
    }

    const transformParticpants = (participants: []): IParticipant[] => {

        let participantsSelect: IParticipant[] = [];
        participants.forEach(elem => {
            participantsSelect.push({
                name: elem[6],
                number: elem[0], finish: elem[10], pId: elem[1],
                place: elem[2], gPlace: elem[3], chipTime: elem[11],
                dropDownName: `${elem[2]}. ${elem[6]} | ${elem[11]}`,
                dropDownGenderName: `${elem[3]} . ${elem[6]} | ${elem[11]}`,
                gender: elem[4] ? (elem[4] as string).toLowerCase().includes('f') ? "female" : "male" : "",
            })
        })
        return participantsSelect
    }

    const transformDistance = (list: {}) => {
        let distance = [];
        for (let key in list) {
            distance.push({value: key, label: key.split('_')[1]})
        }

        return distance
    }

    const transformDynamics = (dynamics: []): IObjecLiteral[] => {
        // @ts-ignore
        const runners: IObjecLiteral[] = dynamics.reduce((prev: IObjecLiteral[], curr: IObjecLiteral[], index) => {
            if (index === 0) {
                prev = prev.concat(curr.map(currentElem => {
                    return {
                        Name: currentElem.Name,
                        "Exists0": currentElem.Exists,
                        "Gun0": currentElem.Gun,
                        "position0": currentElem.RO,
                        "speed0": currentElem.Speed ? transformTime(currentElem.Speed) : 0,
                        "speedString0": currentElem.Speed ? currentElem.Speed : "",
                        "fio0": participants.find(elem => elem.pId === selectPid[0]).name,
                    }
                }))
            } else {
                prev.forEach((el, elIndex) => {
                    let currElem = curr.find((item: IObjecLiteral) => item.Name === el.Name);
                    prev[elIndex][`Exists${index}`] = currElem.Exists;
                    prev[elIndex][`Gun${index}`] = currElem.Gun;
                    prev[elIndex][`position${index}`] = currElem.RO;
                    prev[elIndex][`speed${index}`] = currElem.Speed ? transformTime(currElem.Speed) : 0;
                    prev[elIndex][`speedString${index}`] = currElem.Speed ? currElem.Speed : "";
                    prev[elIndex][`fio${index}`] = participants.find(elem => elem.pId === selectPid[index]).name
                })
            }
            return prev

        }, [])
        return runners
    }

    const transformTime = (time: string): number => {
        let value = 0;
        const [minutes, seconds] = time.replace("min/km", "").trim().split(':').map(Number);
        value = minutes * 60 + seconds
        return value
    }

    const getLegend = (data: any[]): IObjecLiteral => {
        let legend: IObjecLiteral = {}

        data.forEach((d, i) => {
            legend[`fio${i}`] = d[`fio${i}`]
        })

        return legend
    }

    const filterOption = (input: string, option: IObjecLiteral) => {
        return option.children.toLowerCase().includes(input.toLowerCase())
    };
    return (
        <div className="container">
            <div className={state.eventName.length === 0 ? '' : 'v-hidden'}>
                <p>Ссылка на гонку</p>
                <Search placeholder="id гонки, например 359948"
                        enterButton="Поиск"
                        size="large"
                        onChange={handleInputChange}
                        onSearch={handleSearch}
                        value={state.raceId}/>
            </div>

            <div className={state.eventName.length > 0 ? '' : 'v-hidden'}>
                <h1>{state.eventName}</h1>

                <div className={raceList.length === 0 ? 'v-hidden' : ''}>
                    <Form layout="horizontal">
                        {distance.length > 0 &&
                          <Form.Item label="Дистанция">
                            <Select onChange={handleDistanceChange}>
                                {distance.map((item: IDistanceSelect) => {
                                        return <Select.Option value={item.value}
                                                              key={item.value}>{item.label}</Select.Option>
                                    }
                                )}
                            </Select>
                          </Form.Item>
                        }

                        <Form.Item>
                            <Radio.Group block options={genderList} defaultValue="all" onChange={handleChangeGender}/>
                        </Form.Item>

                        <Form.Item>
                            <Select
                                mode="multiple"
                                allowClear
                                showSearch
                                optionFilterProp="children"
                                filterOption={filterOption}
                                style={{width: '100%'}}
                                placeholder="Выберите атлетов"
                                onChange={handleParticipantsChange}
                            >   {participants.filter(item => {
                                if (state.selectGender !== 'all') {
                                    return item.gender === state.selectGender
                                } else {
                                    return true
                                }
                            })
                                .map((item: IParticipant) => {
                                        return <Select.Option value={item.pId}
                                                              key={item.number}>{state.selectGender === "all" ? item.dropDownName : item.dropDownGenderName}</Select.Option>
                                    }
                                )}

                            </Select>
                        </Form.Item>

                        <Form.Item>
                            <Button onClick={getSplits}>Сравнить</Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>

            {finalSplits.length > 0 && <div>
              <p>Динамика позиций</p>
              <DynamicComponent dynamics={transformDynamics(finalSplits)} selectPid={selectPid}
                                legend={getLegend(transformDynamics(finalSplits))}></DynamicComponent>
              <TimeBarChart dynamics={transformDynamics(finalSplits)} selectedPid={selectPid}
                            legend={getLegend(transformDynamics(finalSplits))}></TimeBarChart>
            </div>}
        </div>
    )
}

export default DrowRaceResult;