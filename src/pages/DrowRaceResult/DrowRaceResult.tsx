import DynamicComponent from "../../components/Dynamic";
import TimeBarChart from "../../components/TimeBarChart";
import {Button, Form, Input, Select, Radio, Tooltip, Col, Row} from 'antd';
import {useReducer, useState} from "react";
import RaceResultService from "../../api/RaceResultService";
import {IDistanceSelect, IObjecLiteral, IParticipant, IRaceResultState, IRaceRHR} from "../../interfaces/interfaces";
import {initialRaseResultState, raceResultReducer} from "./state";
import {genderList, rasesListRHR, years} from "../../configData/data";
import {DownloadOutlined, UnorderedListOutlined} from "@ant-design/icons";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import dynamic from "../../components/Dynamic";

const {Search} = Input;

const DrowRaceResult = () => {
    const raceresultService = new RaceResultService();
    const [state, dispatch] = useReducer(raceResultReducer, initialRaseResultState);
    const [splits, setSplit] = useState<{}>([]);


    const setField = (field: keyof IRaceResultState, value: any) => {
        dispatch({type: 'SET_FIELD', payload: {field, value}});
    };

    const setRaceData = (raceList: any[], distance: IDistanceSelect[]) => {
        dispatch({type: 'SET_RACE_DATA', payload: {raceList, distance}});
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({type: "SET_RACE_ID", payload: {raceId: e.target.value}});
    };

    const handleDistanceChange = (e: string) => {
        setField('participants', transformParticpants(state.raceList[e]));
        setField('finalSplits', [])
        setField('selectPid', [])
    }

    const handleChangeGender = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setField('selectGender', e.target.value);
        setField('finalSplits', [])
        setField('selectPid', [])
    }

    const handleButtonRaceSearch = (id: number): void => {
        const raseId = String(id);
        dispatch({type: "SET_RACE_ID", payload: {raceId: raseId}});
        handleSearch(true, raseId)
    }

    const handleBackRasesList = () => {
        dispatch({type: "RESET_FORM"})
    }

    const handleSearch = async (isFromButton?: boolean, raseId?: string) => {
        let transformRaceId = '';

        if (!isFromButton) {
            //проверка id гонки

            transformRaceId = checkRaceId(state.raceId);

            if (transformRaceId === "") {
                return
            }
        } else {
            transformRaceId = raseId
        }


        let localData = localStorage.getItem(transformRaceId);
        if (!localData) {
            try {
                setField('isLoading', true);
                const result = await raceresultService.getConfigData(transformRaceId);
                if (result.key) {
                    setField('key', result.key);
                    setField('eventName', result.eventname)
                    let list;
                    let count = 0;
                    try {
                        list = await raceresultService.getRaceList(result.key, transformRaceId);
                    } catch (error) {
                        console.error(error)
                        // пробуем на другой url
                        if (count < 1) {
                            list = await raceresultService.getRaceListFinal(result.key, transformRaceId);
                        }
                        count++
                    }

                    setRaceData(list.data, transformDistance(list.data))
                    const localStorageData = {
                        key: result.key,
                        eventName: result.eventname,
                        distance: transformDistance(list.data),
                        listData: list.data
                    };
                    localStorage.setItem(transformRaceId, JSON.stringify(localStorageData));
                }
            } catch (error) {
                console.error(error)
                setField('isError', true);
                setField('isLoading', false);
            } finally {
                setField('isLoading', false);
            }
        } else {
            const localStorageData = JSON.parse(localStorage.getItem(transformRaceId));
            setField('key', localStorageData.key);
            setField('eventName', localStorageData.eventName)
            setRaceData(localStorageData.listData, localStorageData.distance)
        }
    }

    const checkRaceId = (str: string): string => {
        let transformRaceId = "";
        if (/^\d{6}$/.test(str)) {
            transformRaceId = str;
        } else {
            if (/\d{6}/.test(str)) {
                const match = str.match(/\d{6}/);
                transformRaceId = match[0];
                dispatch({type: "SET_RACE_ID", payload: {raceId: match[0]}});
            } else {
                alert("Гонки по такой ссылке не найдено")
            }
        }

        return transformRaceId;
    }

    const handleParticipantsChange = (e: string[]) => {
        setField('selectPid', e)
        setField('finalSplits', [])
    }

    const getSplits = async () => {
        const requests = state.selectPid.map((elem, index) => {
            return {
                key: `${index}`,
                fn: () => fetch(`https://my1.raceresult.com/${state.raceId}/RRPublish/data/splits?key=${state.key}&pid=${elem}`).then(r => r.json())
            }
        })


        try {
            setField('isLoading', true);
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
            setField('finalSplits', finalSplits)
            setField('transformDynamics', transformDynamics(finalSplits as []))
        } catch (err) {
            console.error(err.code)
            setField('isLoading', false);
            setField('isError', true);
        } finally {
            setField('isLoading', false);
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

    const getLength = (length: number) => {
        return length > 8 ? 18 : 25
    }

    const transformDynamics = (dynamics: []): IObjecLiteral[] => {
        // @ts-ignore
        const runners: IObjecLiteral[] = dynamics.reduce((prev: IObjecLiteral[], curr: IObjecLiteral[], index) => {
            if (index === 0) {
                prev = prev.concat(curr.map((currentElem, curIndex: number) => {
                    return {
                        Name: currentElem.Name,
                        NameForChart: (currentElem.Name).slice(0, curIndex === 1 ? 5 : getLength(curr.length)),
                        "Exists0": currentElem.Exists,
                        "Gun0": currentElem.Gun,
                        "position0": state.selectGender === 'all' ? currentElem.RO : currentElem.RG,
                        "speed0": currentElem.Speed ? transformTime(currentElem.Speed) : 0,
                        "speedString0": currentElem.Speed ? currentElem.Speed : "",
                        "fio0": state.participants.find(elem => elem.pId === state.selectPid[0]).name,
                    }
                }))
            } else {
                prev.forEach((el, elIndex) => {
                    let currElem = curr.find((item: IObjecLiteral) => item.Name === el.Name);
                    prev[elIndex][`Exists${index}`] = currElem.Exists;
                    prev[elIndex][`Gun${index}`] = currElem.Gun;
                    prev[elIndex][`position${index}`] = state.selectGender === 'all' ? currElem.RO : currElem.RG;
                    prev[elIndex][`speed${index}`] = currElem.Speed ? transformTime(currElem.Speed) : 0;
                    prev[elIndex][`speedString${index}`] = currElem.Speed ? currElem.Speed : "";
                    prev[elIndex][`fio${index}`] = state.participants.find(elem => elem.pId === state.selectPid[index]).name
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
        <div className="content-container">
            {!state.isError && <div>
                {state.eventName === "" && !state.isLoading && <div className="start-container">
                  <h3 className="race-header">Ссылка на страницу гонки от RHR на <b>my.raceresult.com</b> или id гонки
                  </h3>
                  <div className="search-input">
                    <Search placeholder="https://my.raceresult.com/308416/ или 359948"
                            enterButton="Поиск"
                            size="large"
                            onChange={handleInputChange}
                            onSearch={() => handleSearch()}
                            value={state.raceId}/>
                  </div>

                  <h3 className="race-header">Смотреть недавние гонки</h3>

                  <div className="racesList-container">
                      {years.map(year => {
                        return  <div key={year} className="racesList-container-year">
                              <h4>{year}</h4>

                            {rasesListRHR.filter(item => item.year === year).map((item: IRaceRHR, index) => {
                                return <Button key={index + item.nameRace} onClick={() => handleButtonRaceSearch(item.id)}>
                                    {item.nameRace}
                                </Button>
                            })
                            }
                          </div>
                      })}


                  </div>
                </div>}

                {state.eventName.length > 0 && <div>
                  <div style={{position: "relative"}}>
                    <h1 className="race-header">{state.eventName}</h1>
                      {state.eventName.length > 0 &&
                        <Button type="primary" icon={<UnorderedListOutlined/>} size={25} className="race-back-button"
                                color="default" variant="outlined" onClick={handleBackRasesList}>
                          Другие гонки
                        </Button>
                      }
                  </div>

                  <Form layout="horizontal" className="race-form">
                      {state.distance.length > 0 &&
                        <Form.Item className="distance-container">
                          <Select onChange={handleDistanceChange} placeholder="Выбрать дистанцию">
                              {state.distance.map((item: IDistanceSelect) => {
                                      return <Select.Option value={item.value}
                                                            key={item.value}>{item.label}</Select.Option>
                                  }
                              )}
                          </Select>
                        </Form.Item>
                      }


                      {state.participants.length > 0 && <Form.Item>
                        <Radio.Group block options={genderList} defaultValue="all"
                                     onChange={handleChangeGender}/>
                      </Form.Item>}

                      {state.participants.length > 0 && <Form.Item>
                        <Select
                          mode="multiple"
                          allowClear
                          showSearch
                          maxCount={10}
                          optionFilterProp="children"
                          filterOption={filterOption}
                          style={{width: '1200px'}}
                          placeholder="Выберите атлетов (не более 10)"
                          value={state.selectPid}
                          onChange={handleParticipantsChange}
                        >   {state.participants.filter(item => {
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
                      </Form.Item>}

                      {state.distance.length > 0 && state.participants.length > 0 && <Form.Item>
                        <Tooltip title={state.selectPid.length === 0 ? "Неободимо выбрать атлетов" : ""}>
                          <Button onClick={getSplits} color="primary" variant="solid"
                                  disabled={state.selectPid.length === 0}>Сравнить</Button>
                        </Tooltip>
                      </Form.Item>}
                  </Form>
                    {state.isLoading && <Loader/>}
                </div>}


                {state.finalSplits.length > 0 && <div>
                    {!state.isLoading && <div>
                      <DynamicComponent dynamics={state.transformDynamics} selectPid={state.selectPid}
                                        legend={getLegend(state.transformDynamics)}></DynamicComponent>
                      <TimeBarChart dynamics={state.transformDynamics} selectedPid={state.selectPid}
                                    legend={getLegend(state.transformDynamics)}></TimeBarChart>
                    </div>}
                </div>}
            </div>}

            {state.isError && <Error/>}
        </div>
    )
}

export default DrowRaceResult;