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
