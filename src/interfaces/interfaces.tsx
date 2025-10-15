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
