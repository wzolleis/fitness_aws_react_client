//@flow weak
import config from "../config";
import {invokeApig} from "../libs/awsLib";
import type {Plan, ExerciseId, PlanId, Action} from "../types/index";

export const FETCH_PLANS: string = 'FETCH_PLANS';
export const FETCH_PLAN: string = 'FETCH_PLAN';
export const PLAN_SAVED: string = 'PLAN_SAVED';
export const UPDATE_EXERCISE_SELECTION = 'UPDATE_EXERCISE_SELECTION';

export function fetchPlans() {
    const apiRequest = invokeApig({path: config.apiPath.PLANS});
    return {
        type: FETCH_PLANS,
        payload: apiRequest
    }
}


export function fetchPlan(id: PlanId) {
    const apiRequest = invokeApig({path: `${config.apiPath.PLANS}/${id}`});
    return {
        type: FETCH_PLAN,
        payload: apiRequest
    }
}

export function updateExerciseSelection(id: ExerciseId): Action {
    return {
        type: UPDATE_EXERCISE_SELECTION,
        payload: {id}

    }
}

export function savePlan(plan: Plan, exercises: ExerciseId[]) {
    const plan_to_save: Plan = {
        ...plan,
        exercises
    };

    const apiRequest = invokeApig({
        path: config.apiPath.PLANS + `/${plan.id}`,
        method: 'PUT',
        body: plan_to_save
    });

    return {
        type: PLAN_SAVED,
        plan,
        payload: apiRequest
    };
}
