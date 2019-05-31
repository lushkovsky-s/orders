# Intravision hometask

## Install

Using yarn:
```
yarn instiall
```

Using npm:
```
npm install
```

If you haven't nodejs/npm: see install guid [here](https://nodejs.org/en/download/package-manager/) 

## Running

Run with webpack server ([localhost:4200](http://localhost:4200)):
```
yarn start
```

Build static version:
```
yarn build
```

## Architecture

* AppComponent is the root element of the application. It implements the layout (menu + searchbar + router element)
* Each tab has the own component, named {TAB_NAME}TabComponent, stored in /components/{TAB_NAME}-tab/
* All API requests are made by using APIService (./api.service.ts)
* State managemend is mad be using of [MobX](https://mobx.js.org/), integrated with [mobx-angular](https://github.com/mobxjs/mobx-angular). The application has the only one store:./components/orders-tab/oders.store.ts. The store requests (on init) and store all the data that obtain from the API (users, order, statuses, etc.)