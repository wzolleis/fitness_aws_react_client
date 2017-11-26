// @flow
import {FETCH_PLAN, FETCH_PLANS, UPDATE_EXERCISE_SELECTION} from "../actions/PlanActions";
import type {PlanState, Action} from '../types';
import _ from 'lodash';
import type {ExerciseId} from "../types/index";
import {calculateExerciseSelection} from "../utils/PlanSelectionUtils";

const initialState: PlanState = {};

export const planReducer = (state: PlanState = initialState, action: Action): PlanState => {
    switch (action.type) {
        case FETCH_PLANS:
            const newPlans = _.mapKeys(action.payload, 'id');
            return {...state.plans, ...newPlans};
        case FETCH_PLAN:
            // FlowFixMe payload mit id definiert.
            return {...state, [action.payload.id]: action.payload};
        case UPDATE_EXERCISE_SELECTION:
            const {planId, exerciseId} = action.payload;
            const plan = state[planId];
            const exercises: ExerciseId[] = plan.exercises;
            const updatedExercises = calculateExerciseSelection(planId, exerciseId, exercises);
            const updatedPlan = {...plan, exercises: updatedExercises};
            return {
                ...state, [planId]: updatedPlan
            };
        default:
            return state;
    }
};
