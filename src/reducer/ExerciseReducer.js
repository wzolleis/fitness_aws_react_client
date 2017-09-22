import {EXERCISE_DELETED, EXERCISE_SAVED, FETCH_EXERCISES, RECEIVE_EXERCISES_SUCCESS} from "../actions/ExerciseActions";
import _ from 'lodash';

const initialState = {
    exercises: {},
    isDeleting: false,
    isLoading: false,
};

const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EXERCISES:
        case RECEIVE_EXERCISES_SUCCESS:
            const exercises = _.mapKeys(action.payload, 'id');
            return {
                ...state, exercises: {...state.exercises, ...exercises}
            };
        case EXERCISE_SAVED:
            return {
                ...state,
                exercises: {
                    ...state.exercises,
                    [action.payload.id]: action.payload
                }
            };
        case EXERCISE_DELETED:
            return {
                ...state,
                isDeleting: action.isDeleting,
                exercises: _.omit(state.exercises, action.payload.id)
            };
        default:
            return state;
    }
};

export default exerciseReducer;