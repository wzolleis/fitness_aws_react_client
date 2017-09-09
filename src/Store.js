import {applyMiddleware, createStore} from 'redux';

// Logger with default options
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

export function makeStore() {
    return createStoreWithMiddleware(rootReducer);
}

const store = makeStore();

export default store;