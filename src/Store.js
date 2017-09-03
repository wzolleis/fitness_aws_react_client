import {applyMiddleware, createStore} from 'redux';

// Logger with default options
import {createLogger} from 'redux-logger';
import rootReducer from "./reducer/RootReducer";
import thunk from "redux-thunk";

const logger = createLogger({
    // ...options
    collapsed: true,
    source: false
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
    applyMiddleware(logger)
);

export default store;