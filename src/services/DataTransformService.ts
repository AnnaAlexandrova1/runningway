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
}

export default DataTransformService;