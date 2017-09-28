import {FETCH_PLAN, FETCH_PLANS, PLAN_SAVED} from "../actions/PlanActions";
import {PlanState, Action} from '../types';
import {PLAN_EXERCISE_SELECTION_CHANGED} from "../actions/ExerciseSelectionActions";
import _ from 'lodash';
import type {Plan} from "../types/index";

const initialState: PlanState = {};

export const planReducer = (state: PlanState = initialState, action: Action): PlanState => {
    switch (action.type) {
        case FETCH_PLANS:
            const newPlans = _.mapKeys(action.payload, 'id');
            return {...state.plans, ...newPlans};
        case FETCH_PLAN:
            return {...state, [action.payload.id]: action.payload};
        case PLAN_SAVED:
            return state;
        case PLAN_EXERCISE_SELECTION_CHANGED:
            // aktualisiert die Auswahl der Exercises im Plan
            const exercises: string[] = _.values(action.payload.exercises);
            const plan: Plan = {
                ...action.payload.plan,
                exercises
            };
            return {
                ...state,
                [plan.id]: plan
            };
        default:
            return state;
    }
};
