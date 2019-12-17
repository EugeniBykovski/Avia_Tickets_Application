import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

// Init Select
const select = document.querySelectorAll('select');
M.FormSelect.init(select);

// из плагина materialize будем экспортировать function, которая будет возвращать instance нашего select
export function getSelectInstance(elem) { // будет принимать какой-то DOM элемент
    return M.FormSelect.getInstance(elem);
}

// Init Autocomplete
const autocomplete = document.querySelectorAll('.autocomplete');
M.Autocomplete.init(autocomplete); // мы также делаем update data, по которой будет вестить поиск

export function getAutocompleteInstance(elem) { // получение отдельного autocomplete instance
    return M.Autocomplete.getInstance(elem);
}

// Init Pickers Date
const datepickers = document.querySelectorAll('.datepicker');
M.Datepicker.init(datepickers, {
    showClearBtn: true,
    format: 'yyyy-mm',
});

export function getDatePickerInstance(elem) { // получение отдельного datepicker instance
    return M.DatePicker.getInstance(elem);
}