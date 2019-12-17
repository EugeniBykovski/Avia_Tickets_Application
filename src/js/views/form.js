// импортируем из materialize для того, чтобы была возможность применять методы, которые есть у materialize
import {
    getAutocompleteInstance,
    getDatePickerInstance,
} from '../plugins/materialize';

class FormUI {
    constructor(autocompleteInstance, datePickerInstance) {
        // указываем свойства, которые, условно, считаются приватными (хотя в js все свойства являются публичными)
        this._form = document.forms['locationControls']; // получили нашу форму

        // отдельно получим наши input
        this.origin = document.getElementById('autocomplete-origin');
        this.originAutocomplete = autocompleteInstance(this.origin);

        this.destination = document.getElementById('autocomplete-destination');
        this.destinationAutocomplete = autocompleteInstance(this.destination);

        this.depart = datePickerInstance(
            document.getElementById('datepicker-depart'),
        );
        this.return = datePickerInstance(
            document.getElementById('datepicker-return'),
        );
    }

    // геттер для получения формы
    get form() {
        return this._form;
    }

    // создаем отдельные свойства, которые нам будет возвращать данные из наших полей форм
    get originValue() {
        return this.origin.value;
    }

    get destinationValue() {
        return this.destination.value;
    }

    get departDateValue() {
        return this.depart.toString();
    }

    get returnDateValue() {
        return this.return.toString();
    }

    setAutocompleteData(data) {
        this.originAutocomplete.updateData(data);
        this.destinationAutocomplete.updateData(data);
    }
}

const formUI = new FormUI(getAutocompleteInstance, getDatePickerInstance);

export default formUI;

// 1. Заставить отрендорить список для autocomplete. Получить instance, чтобы получить даты.