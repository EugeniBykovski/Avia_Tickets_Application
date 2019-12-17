class CurrencyUI {
    constructor() {
        this.currency = document.getElementById('currency');
        this.dictionary = { // создаем словарь
          USD: "$",
          EUR: "€",
        };
    }

    get currencyValue() {
        return this.currency.value;
    }

    // дергаем этот метод каждый раз, когда мы рендерим наши билеты и мы сможем получить нужный символ
    getCurrencySymbol() { // возвращаем наш словарь
        console.log(this);
        return this.dictionary[this.currencyValue];
    }
}

const currencyUI = new CurrencyUI();

export default currencyUI;