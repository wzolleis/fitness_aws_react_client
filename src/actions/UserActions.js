export const USER_HAS_AUTHENTICATED = 'USER_HAS_AUTHENTICATED';

export function userHasAuthenticated(authenticated) {
    return function (dispatch) {
        return dispatch({
            type: USER_HAS_AUTHENTICATED,
            authenticated: authenticated,
            isAuthenticating: false
        });
    }

}