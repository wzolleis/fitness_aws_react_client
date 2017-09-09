import {EXERCISE_SELECTED, FETCH_EXERCISES, RECEIVE_EXERCISES_SUCCESS} from "../actions/ExerciseActions";

const initialState = {
    exercises: [],
    activeExercise: null
};

const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EXERCISES:
        case RECEIVE_EXERCISES_SUCCESS:
            return Object.assign({}, state, {
                exercises: [...action.payload],
                activeExercise: null
            });
        case EXERCISE_SELECTED:
            return Object.assign({}, state, {
                activeExercise: action.payload
            });
        default:
            return state;
    }
};

export default exerciseReducer;