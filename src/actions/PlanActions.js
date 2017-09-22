import config from "../config";
import {invokeApig} from "../libs/awsLib";

export const FETCH_PLANS = 'FETCH_PLANS';
export const FETCH_PLAN = 'FETCH_PLAN';

export function fetchPlans() {
    const apiRequest = invokeApig({path: config.apiPath.PLANS});
    return {
        type: FETCH_PLANS,
        payload: apiRequest
    }
}


export function fetchPlan(id : String) {
    const apiRequest = invokeApig({path: `${config.apiPath.PLANS}/${id}`});
    return {
        type: FETCH_PLAN,
        payload: apiRequest
    }
}