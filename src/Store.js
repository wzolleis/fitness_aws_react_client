import {applyMiddleware, createStore} from 'redux';

import {createLogger} from 'redux-logger';
import rootReducer from "./reducer/RootReducer";
import thunk from "redux-thunk";
import promiseMiddleware from 'redux-promise';

/**
 * Logs all actions and states after they are dispatched.
 */

// Setup
const middleWare = [
    thunk,
    promiseMiddleware,
];

// Logger Middleware. This always has to be last
const loggerMiddleware = createLogger({
    collapsed: true,

});
middleWare.push(loggerMiddleware);

const createStoreWithMiddleware = applyMiddleware(...middleWare)(createStore);

const store = createStoreWithMiddleware(rootReducer);

export default store;