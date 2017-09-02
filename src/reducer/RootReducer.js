import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import exerciseReducer from "./ExerciseReducer";

const rootReducer = combineReducers({
    // ...your other reducers here
    // you have to pass formReducer under 'form' key,
    // for custom keys look up the docs for 'getFormState'
    exercises: exerciseReducer,
    form: formReducer
});

export default rootReducer;
