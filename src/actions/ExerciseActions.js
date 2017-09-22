import {invokeApig} from "../libs/awsLib";
import config from "../config";

export const RECEIVE_EXERCISES_SUCCESS = 'RECEIVE_EXERCISES_SUCCESS';
export const EXERCISE_DELETED = 'EXERCISE_DELETED';
export const EXERCISE_SAVED = 'EXERCISE_SAVED';
export const FETCH_EXERCISES = 'FETCH_EXERCISES';

export function receivedExercises(exercises) {
    return {
        type: RECEIVE_EXERCISES_SUCCESS,
        payload: exercises
    };
}


export function deleteExercise(exercise) {
    const apiRequest = invokeApig({
        path: config.apiPath.EXERCISES + `/${exercise.id}`,
        method: 'DELETE',
    });

    return {
        type: EXERCISE_DELETED,
        isDeleting: false,
        exercise,
        payload: apiRequest
    }
}

export function saveExercise(exercise) {
    const apiRequest = invokeApig({
        path: config.apiPath.EXERCISES + `/${exercise.id}`,
        method: 'PUT',
        body: exercise,
    });

    return {
        type: EXERCISE_SAVED,
        exercise,
        payload: apiRequest
    };
}

export function fetchExercises() {
    const apiRequest = invokeApig({path: config.apiPath.EXERCISES});
    return {
        type: FETCH_EXERCISES,
        payload: apiRequest
    }
}
