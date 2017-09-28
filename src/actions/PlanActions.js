//@flow weak
import config from "../config";
import {invokeApig} from "../libs/awsLib";
import type {Plan, ExerciseId, PlanId} from "../types/index";

export const FETCH_PLANS: string = 'FETCH_PLANS';
export const FETCH_PLAN: string = 'FETCH_PLAN';
export const PLAN_SAVED: string = 'PLAN_SAVED';

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

export function savePlan(plan: Plan, exercises: ExerciseId[]) {
    const plan_to_save: Plan = {
        ...plan,
        exercises
    };

    console.log(plan_to_save);

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
