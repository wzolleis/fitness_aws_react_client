// @flow
import {FETCH_PLAN, FETCH_PLANS, PLAN_SAVED, UPDATE_EXERCISE_SELECTION} from "../actions/PlanActions";
import type {PlanState, Action} from '../types';
import _ from 'lodash';
import type {ExerciseId} from "../types/index";

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
            let updatedExercises;
            if (exercises.includes(exerciseId)) {
                // exercise aus der Selektion rausnehmen
                updatedExercises = _.filter(exercises, exercise => exercise !== exerciseId);
            }
            else {
                // exercise in die Selektion einfuegen
                updatedExercises = _.concat(exercises, exerciseId);

            }
            const updatedPlan = {...plan, exercises: updatedExercises};
            return {
                ...state, [planId]: updatedPlan
            };
        case PLAN_SAVED:
            return state;
        default:
            return state;
    }
};
