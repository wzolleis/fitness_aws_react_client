import type {Plan} from "../types/index";
import {invokeApig} from "../libs/awsLib";
import config from "../config";

export const FETCH_TRAININGS: string = 'FETCH_TRAININGS';

export function startTraining(plan: Plan) {

};

export function fetchTrainings() {
    const apiRequest = invokeApig({path: config.apiPath.TRAININGS});
    return {
        type: FETCH_TRAININGS,
        payload: apiRequest
    }
}