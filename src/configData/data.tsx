import {ILabelValue, IRaceRHR} from "../interfaces/interfaces";

export const genderList: ILabelValue[] = [
    {label: "Все", value: "all"},
    {label: "Мужчины", value: "male"},
    {label: "Женщины", value: "female"},
]

export const rasesListRHR: IRaceRHR[] = [
    {nameRace: "White Bride Ultra Gelendzhik 2025", id: 359948, year: '2025'},
    {nameRace: "Golden Ring Ultra Trail 100 2025", id: 349839, year: '2025'},
    {nameRace: "Crazy Owl 50 2025 Изборск — Железный город", id: 344123, year: '2025'},
    {nameRace: "Mad Fox Ultra Obsession 2024", id: 318677, year: '2024'},
    {nameRace: "White Bride Ultra Gelendzhik 2024", id: 308416, year: '2024'},
    {nameRace: "Golden Ring Ultra Trail 100 2024", id: 298976, year: '2024'},
    {nameRace: "Crazy Owl 50 2024 White Well", id: 294164, year: '2024'}
]

export const footerPoints: string[] = [
    'О нас',
    // 'Контакты',
]

export const years:string[] = ['2025', '2024']

// максимальное число атлетов
export const maxAthlets = 10;