import {RECEIVE_EXERCISES_SUCCESS} from "../actions/ExerciseActions";

const initialState = {
    exercises: []
};

const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_EXERCISES_SUCCESS:
            return Object.assign({}, state, {
                exercises: [...action.exercises]
            });
        default:
            return state;
    }
};

export default exerciseReducer;