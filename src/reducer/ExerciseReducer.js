import {EXERCISE_SELECTED, RECEIVE_EXERCISES_SUCCESS} from "../actions/ExerciseActions";

const initialState = {
    exercises: [],
    activeExercise: null
};

const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_EXERCISES_SUCCESS:
            return Object.assign({}, state, {
                exercises: [...action.exercises],
                activeExercise: null
            });
        case EXERCISE_SELECTED:
            return Object.assign({}, state, {
                activeExercise: action.exercise
            });
        default:
            return state;
    }
};

export default exerciseReducer;