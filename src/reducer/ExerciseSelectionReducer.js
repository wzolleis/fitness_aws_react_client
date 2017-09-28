import type {Action, ExerciseSelectionState} from "../types/index";
import {PLAN_EXERCISE_SELECTION_CHANGED} from "../actions/ExerciseSelectionActions";
import _ from 'lodash';
import {PLAN_SELECTED} from "../actions/SelectionActions";


const initialState: ExerciseSelectionState = {
    // {0: "xyz", 1: "abc"}
};

export const exerciseSelectionReducer = (state = initialState, action: Action): ExerciseSelectionState => {
    switch (action.type) {
        case PLAN_EXERCISE_SELECTION_CHANGED:
            return action.payload;
        case PLAN_SELECTED:
            // Die ausgewaehlten Exercises vom Plan werden als Selektion im State gesetzt
            const {exercises} : string[] = action.payload; // payload ist der Plan
            return _.mapKeys(exercises, 'id');
        default:
            return state;
    }
};