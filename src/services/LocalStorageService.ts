import {IObjecLiteral} from "../interfaces/interfaces";

class LocalStorageService {
    constructor() {
    }

    getRaceDetails(key: string): any[] | null {
        let items = JSON.parse(localStorage.getItem(key));
        return items
    }

    serRaceDetails(key: string, splits: IObjecLiteral[]): void{
        localStorage.setItem(key, JSON.stringify(splits));
    }
}

export default LocalStorageService;