import {invokeApig} from "../libs/awsLib";
import config from "../config";

export const RECEIVE_EXERCISES_SUCCESS = 'RECEIVE_EXERCISES_SUCCESS';
export const EXERCISE_SELECTED = 'EXERCISE_SELECTED';

function receiveExercisesSuccess(json) {
    return {
        type: RECEIVE_EXERCISES_SUCCESS,
        exercises: json
    };
}


export function receivedExercises(exercises) {
    return receiveExercisesSuccess(exercises);
}

export const exercises = () => {
    return invokeApig({path: config.apiPath.EXERCISES});
};

export function exerciseSelected(exercise) {
    return {
        type: EXERCISE_SELECTED,
        exercise
    }
}
