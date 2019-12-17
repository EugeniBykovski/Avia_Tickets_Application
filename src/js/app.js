import '../css/style.css';
import './plugins';
import locations from './store/locations';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';

document.addEventListener('DOMContentLoaded', e => {
    const form = formUI.form; // получаем форму

    // Events
    initApp(); // инициализируем приложение
    form.addEventListener('submit', e => { // навешиваем события 
        e.preventDefault();
        onFormSubmit();
    })

    // Handlers
    // несколько методов, которые нам нужно вызвать для того, чтобы запустить приложение (единое место)
    async function initApp() {
        await locations.init(); // подождем, пока инициализируются все наши locations
        formUI.setAutocompleteData(locations.shortCities);
    }

    async function onFormSubmit() {
        // собрать данные из all inputs (в form.js создадим отдельные геттеры для получения данных из inputs)
        const origin = locations.getCityCodeByKey(formUI.originValue); // передаем то, что выбрал пользователь
        const destination = locations.getCityCodeByKey(formUI.destinationValue); // передаем то, что выбрал пользователь
        const depart_date = formUI.departDateValue;
        const return_date = formUI.returnDateValue;

        // currency - когда будет происходить submit, по умолчанию сервер возвращает в долларе, но можем передать значение и сервер вернет в евро.
        const currency = currencyUI.currencyValue;

        // так код должен быть преобразован - CODE, CODE, 2019-09, 2019-10
        // console.log(origin, destination, depart_date, return_date);

        // собрать данные в объект и отправить на сервер по отдельному запросу для получения наших билетов
        await locations.fetchTickets({ // обрабатываем события
            origin,
            destination,
            depart_date,
            return_date,
            currency,
        });

        // console.log(locations.lastSearch);
        ticketsUI.renderTickets(locations.lastSearch);
    }
});