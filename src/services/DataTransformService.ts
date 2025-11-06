class DataTransformService {
    constructor() {
    }

    calcWidth = (width: number):number => {
        if(width < 768){
            return  width * 0.9
        } else if(width >= 768 && width < 1280){
            return  width * 0.9
        } else {
            return  Math.max(width * 0.88, 1200)
        }
    }

    tickTransform = (value: string): string => {
        const parts = value.split('km -');
        let part2 = (item: string) =>  item.length <= 12 ? item : item.slice(-item.length, item.length - 9) + "...";
        const result = `${parts[0] ? parts[0].trim() : ''}${parts[1] ? "-" + part2(parts[1].trim()) : ''}`;
        return result;
    }

}

export default DataTransformService;