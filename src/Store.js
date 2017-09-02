import {applyMiddleware, createStore} from 'redux';

// Logger with default options
import logger from 'redux-logger';
import rootReducer from "./reducer/RootReducer";
import thunk from "redux-thunk";

const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
    applyMiddleware(logger)
);

export default store;