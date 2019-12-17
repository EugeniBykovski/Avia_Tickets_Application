// Класс с набором методов для взаимодействия с сервером. (+ Axios)
import axios from 'axios';
import config from '../config/apiConfig';

/*
    Сейчас на сервере есть несколько endpoints:
    1. countries - array of countries
    2. cities - array of cities
    3. prices - array of prices
*/

class Api {
  constructor(config) {
    // будет создавать свойство
    this.url = config.url;
  }

  // набор методов для работы с сервером (они предоставляются нашему app.js, из которого мы будем вызывать те методы, которые нам нужны)

  // будем выполнять запрос на сервер
  async countries() {
    try {
      const response = await axios.get(`${this.url}/countries`);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async cities() {
    try {
      const response = await axios.get(`${this.url}/cities`);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  async airlines() {
    try {
      const response = await axios.get(`${this.url}/airlines`);
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }

  // UI часть по выбору соответствующих параметров
  async prices(params) {
    try {
      const response = await axios.get(`${this.url}/prices/cheap`, {
        params,
      });
      return response.data;
    } catch (err) {
      console.log(err);
      return Promise.reject(err);
    }
  }
}

const api = new Api(config); // создаем экземпляр этого класса (передаем тот config, который мы создали)

// создав api, мы его экспортируем
export default api;