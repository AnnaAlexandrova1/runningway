import {IRaceResultState, RaceResultAction} from "../../interfaces/interfaces";

export const initialRaseResultState: IRaceResultState = {
    key: "",
    isLoading: false,
    isError: false,
    raceId: null,
    eventName: "",
    selectGender: "all",
    selectPid: [],
    raceList: [],
    distance: [],
    participants: [],
    finalSplits: [],
    transformDynamics: [],
};

export const raceResultReducer = (state: IRaceResultState, action: RaceResultAction): IRaceResultState => {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.payload.field]: action.payload.value
            };

        case 'SET_RACE_ID':
            return {
                ...state,
                raceId: action.payload.raceId
            };

        case 'SET_RACE_DATA':
            return {
                ...state,
                raceList: action.payload.raceList,
                distance: action.payload.distance
            };

        case 'RESET_FORM':
            return initialRaseResultState;

        default:
            return state;
    }
};