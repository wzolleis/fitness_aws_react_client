import {invokeApig} from "../libs/awsLib";
import config from "../config";

export const RECEIVE_EXERCISES_SUCCESS = 'RECEIVE_EXERCISES_SUCCESS';

function receiveExercisesSuccess(json) {
    return {
        exercises: json,
        type: RECEIVE_EXERCISES_SUCCESS
    };
}


export function receivedExercises(exercises) {
    return function (dispatch) {
        dispatch(receiveExercisesSuccess(exercises));
    };
}

export const exercises = () => {
    return invokeApig({path: config.apiPath.EXERCISES});
};
