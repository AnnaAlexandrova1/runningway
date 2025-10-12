class RaceresultService {
    constructor() {

    }

    // GET - получение конфига
    async getConfigData(raceId: string) {
        try {
            const response = await fetch(`https://my.raceresult.com/${raceId}/RRPublish/data/config?lang=en&page=live&noVisitor=1&v=1`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    // GET - получение листа со всеми результатами
    async getRaceList(key: string, raceId: string) {
        try {
            const response = await fetch(`https://my1.raceresult.com/${raceId}/RRPublish/data/list?key=${key}&listname=Online|Live&page=live&contest=0&r=leaders&l=100000`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }

    // GET - получение сплита по атлету
    async getSplit(key: string, raceId: string, pid: string) {
        try {
            const response = await fetch(`https://my1.raceresult.com/${raceId}/RRPublish/data/splits?key=${key}&pid=${pid}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }


}

export default RaceresultService;