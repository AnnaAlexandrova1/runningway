import LocalStorageService from "./LocalStorageService";
// const BASE_URL = 'https://192.168.1.249:443/api/v1/compare';
const BASE_URL = 'https://www.runningway.ru/api/v1/compare';

class StatisticCountService {
    async setStatsCounter(key: string) {
        try {
            const response = await fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    key
                })
            });

            // Не ждем и не обрабатываем ответ
            // Просто игнорируем response

        } catch (error) {
            // Обрабатываем только ошибки сети/отправки
            console.error('Ошибка отправки:', error);
        }
    }
}

export default StatisticCountService;