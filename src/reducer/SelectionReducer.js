import {EXERCISE_SELECTED, PLAN_SELECTED} from "../actions/SelectionActions";
import type {SelectionState} from "../types/index";
import {EXERCISE_DELETED} from "../actions/ExerciseActions";

const initialState: SelectionState = {
    activeExercise: null,
    activePlan: null,
};

export const selectionReducer = (state: SelectionState = initialState, action: Action): SelectionState => {
    switch (action.type) {
        case EXERCISE_SELECTED:
            return {
                ...state,
                activeExercise: action.payload
            };
        case PLAN_SELECTED:
            return {
                ...state,
                activePlan: action.payload
            };
        case EXERCISE_DELETED:
            return {
                ...state,
                activeExercise: null
            };
        default:
            return state;
    }
};