import {REQUEST_EXERCISES} from "../actions/ExerciseActions";

const exerciseReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_EXERCISES:
            return Object.assign({}, state, {
                isLoading: action.isLoading
            })
        default:
            return state;
    }
};

export default exerciseReducer;