import {IRaceResultState, RaceResultAction} from "../../interfaces/interfaces";

export const initialRaseResultState: IRaceResultState = {
    key: "",
    raceId: null,
    eventName: "",
    selectGender: "all",
    selectPid: [],
    raceList: [],
    distance: [],
    participants: [],
    splits: {},
    finalSplits: []
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

        case 'SET_PARTICIPANTS':
            return {
                ...state,
                participants: action.payload
            };

        case 'SET_SPLITS':
            return {
                ...state,
                splits: action.payload.splits,
                finalSplits: action.payload.finalSplits
            };

        case 'ADD_SELECTED_PID':
            return {
                ...state,
                selectPid: [...state.selectPid, action.payload]
            };

        case 'REMOVE_SELECTED_PID':
            return {
                ...state,
                selectPid: state.selectPid.filter(pid => pid !== action.payload)
            };

        case 'CLEAR_SELECTED_PIDS':
            return {
                ...state,
                selectPid: []
            };

        case 'RESET_FORM':
            return initialRaseResultState;

        default:
            return state;
    }
};