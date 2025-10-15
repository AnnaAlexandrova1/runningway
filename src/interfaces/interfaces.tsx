export interface IDistanceSelect {
    value: string;
    label: string;
}

export interface IParticipant {
    name: string;
    number: string;
    finish: string;
    pId: string;
    place: string;
    gPlace: string;
    chipTime: string;
    dropDownName: string;
    dropDownGenderName: string;
    gender: string
}

export interface IObjecLiteral {
    [key: string]: any
}


export interface ILabelValue {
    label: string;
    value: string | number;
}


export interface IRaceResultState {
    key: string;
    raceId: string;
    eventName: string;
    selectGender: string;
    selectPid: string[];
    raceList: IObjecLiteral[];
    distance: IDistanceSelect[];
    participants: IParticipant[];
    splits: {};
    finalSplits: IObjecLiteral[];
};

export type RaceResultAction =
    | { type: 'SET_FIELD'; payload: { field: keyof IRaceResultState; value: any } }
    | { type: 'SET_RACE_ID'; payload: { raceId: string } }
    | { type: 'SET_RACE_DATA'; payload: { raceList: any[]; distance: IDistanceSelect[] } }
    | { type: 'SET_PARTICIPANTS'; payload: IParticipant[] }
    | { type: 'SET_SPLITS'; payload: { splits: {}; finalSplits: IObjecLiteral[] } }
    | { type: 'ADD_SELECTED_PID'; payload: string }
    | { type: 'REMOVE_SELECTED_PID'; payload: string }
    | { type: 'CLEAR_SELECTED_PIDS' }
    | { type: 'RESET_FORM' };