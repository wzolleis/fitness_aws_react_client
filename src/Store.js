import {applyMiddleware, createStore} from 'redux';

// Logger with default options
import logger from 'redux-logger';
import rootReducer from "./reducer/RootReducer";

const store = createStore(
    rootReducer,
    applyMiddleware(logger)
);

export default store;