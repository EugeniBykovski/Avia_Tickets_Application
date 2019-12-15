# Avia_Tickets_Application
Airfare search application with loading of their price, country and air carrier.

1. Possibility to choose departure country
2. Ability to choose the country of arrival
3. Ability to select departure date and arrival date
4. Implemented the ability to change currencies
5. Work is underway with the ES6 stack, OOP, AJAX, Webpack.

We have a server. We need to build communication between our server and the client side.

The first layer will be Services. With their help, we will organize interaction with the server (we have this API SERVICE). It will have a set of methods for receiving any data from the server and the client part (App JS) will access this service, which will ask it for this or that information for our application.

The application also contains a settings file (Config), which contains all the application settings. It is connected to both the App JS and the API Service.

The application also has some plugins, several of which are connected to the API Service and App JS. Required for AJAX requests, Promises, communication between the application and the server. 

In order to fulfill the requests, we need the AXIOS plugin.

Добавляем слой Store. Это единый источник данных, в котором хранится какое-то состояние данных всего нашего приложения. В нашем случае, в Store мы будем хранить наши locations, это наши города и страны, которые мы получили от сервера (countries, cities). Это нужно для того, чтобы потом любая часть нашегтприложения имела единый источник, из которого она будет брать текущие данные, с которыми она будет работать.
Из Store будет идти связь с нашим сервисом API Service.