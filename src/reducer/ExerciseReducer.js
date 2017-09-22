import {
    EXERCISE_DELETED, EXERCISE_SAVED, EXERCISE_SELECTED, FETCH_EXERCISES,
    RECEIVE_EXERCISES_SUCCESS
} from "../actions/ExerciseActions";
import _ from 'lodash';

const initialState = {
    exercises: {},
    isDeleting: false,
    isLoading: false,
    activeExercise: null
};

const exerciseReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_EXERCISES:
        case RECEIVE_EXERCISES_SUCCESS:
            const exercises = _.mapKeys(action.payload, 'id');
            return {
                ...state, exercises: {...state.exercises, ...exercises}
            };

        // return Object.assign({}, state, {
        //     exercises: [...action.payload],
        //     activeExercise: null
        // });
        case EXERCISE_SAVED:
            return {
                ...state,
                exercises: {
                    ...state.exercises,
                    [action.payload.id]: action.payload
                }
            };
        // return Object.assign({}, state, {
        //     exercises: state.exercises.map(item => item.id === action.exercise.id ?
        //         // transform the one with a matching id
        //         {...action.exercise} :
        //         item
        //     )
        // });
        case EXERCISE_DELETED:
            return {
                ...state,
                isDeleting: action.isDeleting,
                activeExercise: null,
                exercises: _.omit(state.exercises, action.payload.id)
            };
        // return Object.assign({}, state, {
        //     isDeleting: action.isDeleting,
        //     exercises: state.exercises.filter(item => action.exercise !== item),
        //     activeExercise: null
        // });
        case EXERCISE_SELECTED:
            return Object.assign({}, state, {
                activeExercise: action.payload
            });
        default:
            return state;
    }
};

export default exerciseReducer;