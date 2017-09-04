import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import exerciseReducer from "./ExerciseReducer";
import userReducer from "./UserReducer";

const rootReducer = combineReducers({
    // ...your other reducers here
    // you have to pass formReducer under 'form' key,
    // for custom keys look up the docs for 'getFormState'
    exercise: exerciseReducer,
    user: userReducer,
    form: formReducer
});

export default rootReducer;
