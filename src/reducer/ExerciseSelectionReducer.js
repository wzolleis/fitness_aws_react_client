import type {ExerciseSelectionState} from "../types/index";
import {PLAN_EXERCISE_SELECTION_CHANGED} from "../actions/ExerciseSelectionActions";


const initialState = {
    // {0: "xyz", 1: "abc"}
};
export const exerciseSelectionReducer = (state: SelectionState = initialState, action: Action): ExerciseSelectionState => {
    switch (action.type) {
        case PLAN_EXERCISE_SELECTION_CHANGED:
            return action.payload;
        default:
            return state;
    }
};