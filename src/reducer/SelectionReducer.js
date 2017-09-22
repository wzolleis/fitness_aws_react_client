import {EXERCISE_SELECTED, PLAN_SELECTED, RESET_SELECTION} from "../actions/SelectionActions";
import type {SelectionState} from "../types/index";


const initialState: SelectionState = {
    activeExercise: null,
    activePlan: null,
};

export const selectionReducer = (state: SelectionState = initialState, action: Action): SelectionState => {
    switch (action.type) {
        case EXERCISE_SELECTED:
            return {
                ...state,
                activeExercise: action.payload,
                activePlan: null
            };
        case PLAN_SELECTED:
            return {
                ...state,
                activePlan: action.payload,
                activeExercise: null
            };

        case RESET_SELECTION:
            return {
                ...state,
                activeExercise: null,
                activePlan: null

            };
        default:
            return state;
    }
};