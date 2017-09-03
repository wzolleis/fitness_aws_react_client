import {CognitoUserPool} from "amazon-cognito-identity-js";
import config from "../config";

export const REQUEST_CURRENT_USER = 'REQUEST_CURRENT_USER';
export const RECEIVE_CURRENT_USER_SUCESS = 'REQUEST_CURRENT_USER_SUCESS';
export const UPDATE_USER_TOKEN = 'UPDATE_USER_TOKEN';


function requestCurrentUser() {
    return {
        type: REQUEST_CURRENT_USER,
        isLoading: false
    }
}

function receiveCurrentUserSuccess(user) {
    return {
        type: RECEIVE_CURRENT_USER_SUCESS,
        user: user,
        isLoading: false
    }
}

export function fetchCurrentUser() {
    return function (dispatch) {
        dispatch(requestCurrentUser());
        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });
        const currentUser = userPool.getCurrentUser();

        return dispatch(receiveCurrentUserSuccess(currentUser));
    }
}

export function updateUserToken(userToken) {
    return function (dispatch) {
        return dispatch({
            type: UPDATE_USER_TOKEN,
            userToken: userToken,
            isLoadingUserToken: false
        });
    }

}