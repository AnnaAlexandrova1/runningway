// @ts-ignore
import React, {useReducer} from 'react';
import {Button, Flex} from "antd";
import {initialRaseResultState, raceResultReducer} from "../pages/DrowRaceResult/state";

const Error = () => {
    const [state, dispatch] = useReducer(raceResultReducer, initialRaseResultState);
    const returnToStart = () => {
        dispatch({type: "RESET_FORM"})
    }

    return (
        <Flex vertical="true" align="center" gap="middle" justify="center" style={{height: '100%'}}>
            <p>Ошибка</p>
            <p>Что-то пошло не так...</p>
            <Button onClick={returnToStart}>
                Попробовать еще раз
            </Button>
        </Flex>
    )
}

export default Error;