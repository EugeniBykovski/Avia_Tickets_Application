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

Add a Store layer. This is the only data source. In our case, we will store our locations in the store, these are our cities and countries that we received from the server (country, city). It was the one of a kind source from which it would work. From the store there will be a connection with our service API Service.
