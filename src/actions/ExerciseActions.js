//@flow
import type {Action, Exercise, Exercises} from '../types';

import config from "../config";
import {invokeApig} from "../libs/awsLib";

export const RECEIVE_EXERCISES_SUCCESS = 'RECEIVE_EXERCISES_SUCCESS';
export const EXERCISE_DELETED = 'EXERCISE_DELETED';
export const EXERCISE_SAVED = 'EXERCISE_SAVED';
export const FETCH_EXERCISES = 'FETCH_EXERCISES';

export function receivedExercises(exercises: Exercises) {
    return {
        type: RECEIVE_EXERCISES_SUCCESS,
        payload: exercises
    };
}


export function deleteExercise(exercise: Exercise): Action {
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

export function saveExercise(exercise: Exercise): Action {
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

export function fetchExercises(): Action {
    const apiRequest = invokeApig({path: config.apiPath.EXERCISES});
    return {
        type: FETCH_EXERCISES,
        payload: apiRequest
    }
}
