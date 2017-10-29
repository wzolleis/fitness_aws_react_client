import type {ExerciseId, Plan, Training} from "../types/index";
import {invokeApig} from "../libs/awsLib";
import config from "../config";

export const FETCH_TRAININGS: string = 'FETCH_TRAININGS';
export const SAVE_TRAINING: string = 'SAVE_TRAINING';
export const START_TRAINING: string = 'START_TRAINING';

export function createTraining(plan: Plan) {
    const exercises: ExerciseId[] = plan.exercises;
    const training: Training = {
        name: plan.name,
        plan: plan.id,
        exercises: exercises
    };

    const apiRequest = invokeApig({
        path: config.apiPath.TRAININGS,
        method: 'POST',
        body: training
    });
    return {
        type: SAVE_TRAINING,
        payload: apiRequest
    }
};

export function startTraining(training: Training) {
    console.log('training = ', training);
    return {
        type: START_TRAINING,
        payload: {}
    }
    // TODO
}

export function fetchTrainings() {
    const apiRequest = invokeApig({path: config.apiPath.TRAININGS});
    return {
        type: FETCH_TRAININGS,
        payload: apiRequest
    }
}