import api from '../services/apiService';

// при загрузке нашего приложения нам сразу нужно будет получить и города и страны (countries and cities).

class Locations { // будет представлено в виде объекта
    constructor(api) { // принимает экземпляр класса api
        this.api = api; // мы здесь будем его сохранять
        this.countries = null; // на старте ничего не будет
        this.cities = null; // на старте никаких дополнительных значений
    }

    // в этом методе мы запросим сразу же города и страны у нашего api service
    async init() {
        // all - для получения сразу нескольких асинхронных операций
        const response = await Promise.all([
            // получить страны
            this.api.countries(), // получим массив со странами
            // получить города
            this.api.cities() // получим массив с городами
        ]);

        // нам нужно разделить на страны и города наш response и внутри сохранить страны и города
        const [countries, cities] = response;
        this.countries = countries;
        this.cities = cities;

        return response;
    }

    // метод для получения городов по коду страны
    getCitiesByCountryCode(code) { // этот метод будет принимать код 
        return this.cities.filter(city => city.country_code === code); // и мы будем фильтровать текущие города по странам
    }
}

const locations = new Locations(api);

export default locations;

// У нас должно быть разбиение на большое колличество store (хранилищ) внутри нашего приложения, в котором мы будем обслуживать какую-то часть данных нашего приложения.