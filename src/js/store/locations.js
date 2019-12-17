import api from '../services/apiService';
import {formatDate} from '../helpers/date';

// при загрузке нашего приложения нам сразу нужно будет получить и города и страны (countries and cities).

class Locations {
  // будет представлено в виде объекта
  constructor(api, helpers) {
    // принимает экземпляр класса api
    this.api = api; // мы здесь будем его сохранять
    this.countries = null; // на старте ничего не будет
    this.cities = null; // на старте никаких дополнительных значений
    this.shortCities = {}; // создадим переменную для autocomplite
    this.lastSearch = {};
    this.airlines = {}; // создадим пустой объект авиакомпаний
    this.formatDate = helpers.formatDate; // мы сможем получить результат форматирования даты
  }

  // в этом методе мы запросим сразу же города и страны у нашего api service
  async init() {
    // all - для получения сразу нескольких асинхронных операций
    const response = await Promise.all([
      // получить страны
      this.api.countries(), // получим массив со странами
      // получить города
      this.api.cities(), // получим массив с городами
      // получить авиакомпании
      this.api.airlines(), // получим массив с авиакомпаниями
    ]);

    // нам нужно разделить на страны и города наш response и внутри сохранить страны и города
    const [countries, cities, airlines] = response;
    this.countries = this.serializeCountries(countries);
    this.cities = this.serializeCities(cities);
    this.shortCities = this.createShortCities(this.cities);
    this.airlines = this.serializeAirlines(airlines); // добавим в пустой объект airlines

    return response;
  }

  // метод возвращает ключ города
  getCityCodeByKey(key) {
    const city = Object.values(this.cities).find(
      item => item.full_name === key,
    );
    return city.code;
  }

  // метод вернет название городов
  getCityNameByCode(code) {
      return this.cities[code].name;
  }

  // метод возвращает код авиакомпании
  getAirlineNameByCode(code) {
    return this.airlines[code] ? this.airlines[code].name : ''; // !! если в билете есть код авиакомпании, которой нет в списке авиакомпаний (редко)
  }

  // метод возвращает логотип авиакомпании или пуствую строку
  getAirlineLogoByCode(code) {
      return this.airlines[code] ? this.airlines[code].logo : '';
  }

  // формируем объект для autocomplite
  createShortCities(cities) {
    // Object.entries => [key, value]
    return Object.entries(cities).reduce((acc, [, city]) => { // объект города и страны
      acc[city.full_name] = null;
      return acc;
    }, {});
  }

  // формирем объект с авиакомпаниями
  serializeAirlines(airlines) {
    return airlines.reduce((acc, item) => {
      item.logo = `http://pics.avs.io/200/200/${item.code}.png`;
      item.name = item.name || item.name_translations.en; // если нету, то английская вариация
      acc[item.code] = item;
      return acc;
    }, {});
  }

  // Преобразуем страны - Serialize
  serializeCountries(countries) {
    // {'Country code}: {...} - такой формат нам нужен
    return countries.reduce((acc, country) => {
      // на каждой итерации мы новый объект добавляем в ключ (код страны)
      acc[country.code] = country;
      return acc; // и возвращаем аккумулятор acc
    }, {});
  }

  // Преобразуем города, но ключом уже будет то название, которое мы хотим в будущем использовать для autocomplete
  serializeCities(cities) {
    // {'City name, Country name'}: {...}
    return cities.reduce((acc, city) => {
        const country_name = this.countries[city.country_code].name; // получим имя этой страны
        city.name = city.name || city.name_translations.en; // выбирает английскую интерпритацию вместо null
        const full_name = `${city.name},${country_name}`; 
        // const key = `${city.name},${country_name}`; // далее мы формируем ключ
        // acc[key] = city; // запишем в объект сам город
        acc[city.code] = {
            ...city,
            country_name,
            full_name,
        };
        return acc;
    }, {});
  }

//   // метод для удобства получения кода страны
//   getCountryNameByCode(code) {
//     // метод получает код страны
//     return this.countries[code].name; // возвращаем код страны
//   }

  // // метод для получения городов по коду страны
  // getCitiesByCountryCode(code) { // этот метод будет принимать код
  //     return this.cities.filter(city => city.country_code === code); // и мы будем фильтровать текущие города по странам
  // }

  async fetchTickets(params) {
    const response = await this.api.prices(params);
    this.lastSearch = this.serializeTickets(response.data);
    // сериализовать поиск так, чтобы внутри были название города и страны
  }

  serializeTickets(tickets) {
      return Object.values(tickets).map(ticket => { // будем возвращать объект
          return {
            ...ticket, // скопируем все те поля, которые там есть
            origin_name: this.getCityNameByCode(ticket.origin), // получим полное имя города
            destination_name: this.getCityNameByCode(ticket.destination),
            airline_logo: this.getAirlineLogoByCode(ticket.airline), // получим лого авиакомпании
            airline_name: this.getAirlineNameByCode(ticket.airline), // получим имя авиакомпании
            departure_at: this.formatDate(ticket.departure_at, 'dd MMM yyyy hh:mm'),
            return_at: this.formatDate(ticket.return_at, 'dd MMM yyyy hh:mm'),
          };
      });
  }
}

const locations = new Locations(api, { formatDate }); // дополнительно создали объект helpers

export default locations;

// У нас должно быть разбиение на большое колличество store (хранилищ) внутри нашего приложения, в котором мы будем обслуживать какую-то часть данных нашего приложения.

// Какие форматы нам сейчас нужны:
// {'city, country': null}
// мы получаем данные в виде массива городов и стран [{}, {}]
// {} - из массива мы будем получать код города, удобнее его преобразовать в объект данного типа: {'city': {...}} => cities[code]
// нам нужно вытянуть код города, который был выбран