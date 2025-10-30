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
    isLoading: boolean;
    isError: boolean;
    raceId: string;
    eventName: string;
    selectGender: string;
    selectPid: string[];
    raceList: IObjecLiteral[];
    distance: IDistanceSelect[];
    participants: IParticipant[];
    finalSplits: IObjecLiteral[];
    transformDynamics: IObjecLiteral[];
};

export type RaceResultAction =
    | { type: 'SET_FIELD'; payload: { field: keyof IRaceResultState; value: any } }
    | { type: 'SET_RACE_ID'; payload: { raceId: string } }
    | { type: 'SET_RACE_DATA'; payload: { raceList: any[]; distance: IDistanceSelect[] } }
    | { type: 'RESET_FORM' };

export interface IRouteElement {
    path: string;
    component: React.ReactElement;
    protected_route?: boolean;
}

export interface IRaceRHR {
    nameRace: string;
    id: number;
    year: string;
}