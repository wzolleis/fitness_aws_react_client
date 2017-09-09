import {invokeApig} from "../libs/awsLib";
import config from "../config";

export const RECEIVE_EXERCISES_SUCCESS = 'RECEIVE_EXERCISES_SUCCESS';
export const EXERCISE_SELECTED = 'EXERCISE_SELECTED';
export const FETCH_EXERCISES = 'FETCH_EXERCISES';

export function receivedExercises(exercises) {
    return {
        type: RECEIVE_EXERCISES_SUCCESS,
        payload: exercises
    };
}

export const exercises = () => {
    return invokeApig({path: config.apiPath.EXERCISES});
};

export function exerciseSelected(exercise) {
    return {
        type: EXERCISE_SELECTED,
        payload: exercise
    }
}

export function fetchExercises() {
    const apiRequest = invokeApig({path: config.apiPath.EXERCISES});
    return {
        type: FETCH_EXERCISES,
        payload: apiRequest
    }
}
