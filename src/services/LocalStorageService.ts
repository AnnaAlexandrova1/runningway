import {IObjecLiteral} from "../interfaces/interfaces";
import { v7 as uuidv7 } from 'uuid';

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

    getCounterKey(): string {
        let keyName = 'guid'
        let key = localStorage.getItem(keyName);
        if(!key){
            const newGuid = uuidv7();
            localStorage.setItem(keyName, newGuid);
            key = newGuid;
        }
        return key;
    }
}

export default LocalStorageService;