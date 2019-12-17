import currencyUI from './currency';

class TicketsUI {
  constructor(currency) {
    this.container = document.querySelector('.tickets-sections .row');
    this.getCurrencySymbol = currency.getCurrencySymbol.bind(currency); // привязка в контексте currency
  }

  // метод принимает массив билетов
  renderTickets(tickets) {
    this.clearContainer();

    // мы будем проверять,е сли массив билетов пустой, тонам нужно показать сообщение, что билеты не найдены
    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    // создаем фрагмент
    let fragment = '';

    // при каждом рендеринге мы создадим currency
    const currency = this.getCurrencySymbol(); // каждый раз будем просить отдать нам символ валюты

    tickets.forEach(ticket => {
      const template = TicketsUI.ticketTemplate(ticket, currency);
      fragment += template;
    });

    this.container.insertAdjacentHTML("afterbegin", fragment);
  }

  // метод очишает контейнер
  clearContainer() {
    this.container.innerHTML = '';
  }

  // метод выводит сообщение о том, что билеты не были найдены
  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML("afterbegin", template); // если придет пустой массив, то выведется сообщение
  }

  // метод возвращает шаблон о том, что билеты не были найдены
  static emptyMsgTemplate() {
    return `
            <div class="tickets-empty-res-msg">
                По вашему запросу ничего не найдено.
            </div>
        `;
  }

  // метод генерирует шаблон одного билета
  static ticketTemplate(ticket, currency) {
    return `
            <div class="col s12 m6">
                <div class="card ticket-card">
                    <div class="ticket-airline d-flex align-items-center">
                        <img src="${ticket.airline_logo}" class="ticket-airline-img" />
                        <span class="ticket-airline-name">${
                          ticket.airline_name
                        }</span>
                    </div>
                    <div class="ticket-destination d-flex align-items-center">
                        <div class="d-flex align-items-center mr-auto">
                            <span class="ticket-city">${
                              ticket.origin_name
                            }</span>
                            <i class="medium material-icons">flight_takeoff</i>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="medium material-icons">flight_land</i>
                            <span class="ticket-city">${
                              ticket.destination_name
                            }</span>
                        </div>
                    </div>
                    <div class="ticket-time-price d-flex align-items-center">
                        <span class="ticket-time-departure">${
                          ticket.departure_at
                        }</span>
                        <span class="ticket-price ml-auto">${currency}${
      ticket.price
    }</span>
                    </div>
                    <div class="ticket-additional-info">
                        <span class="ticket-transfers">Пересадок: ${
                          ticket.transfers
                        }</span>
                        <span class="ticket-flight-number">Номер рейса: ${
                          ticket.flight_number
                        }</span>
                    </div>
                </div>
            </div>
        `;
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;