import config from "../config";
import {invokeApig} from "../libs/awsLib";

export const FETCH_PLANS = 'FETCH_PLANS';

export function fetchPlans() {
    const apiRequest = invokeApig({path: config.apiPath.PLANS});
    return {
        type: FETCH_PLANS,
        payload: apiRequest
    }
}