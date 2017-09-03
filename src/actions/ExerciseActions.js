import {invokeApig} from "../libs/awsLib";
import config from "../config";

export const REQUEST_EXERCISES = 'REQUEST_EXERCISES';
//export const RECEIVE_EXERCISES_SUCCESS = 'RECEIVE_EXERCISES_SUCCESS';
//export const RECEIVE_EXERCISES_ERROR = 'RECEIVE_EXERCISES_ERROR';

function requestExerciseList() {
    return {
        type: REQUEST_EXERCISES,
        isLoading: true
    }
}

/*function receiveExercisesSuccess() {
    return {
        type: RECEIVE_EXERCISES_SUCCESS,
        isLoading: false
    }
}

function receiveExercisesError() {
    return {
        type: RECEIVE_EXERCISES_ERROR,
        isLoading: false
    }
}*/

export function fetchExercises(userToken) {
    return function (dispatch) {
        dispatch(requestExerciseList());

        return invokeApig({path: config.apiPath.EXERCISES}, userToken);
    }
}