export const USER_HAS_AUTHENTICATED = 'USER_HAS_AUTHENTICATED';

export function userHasAuthenticated(authenticated) {
    return {
        type: USER_HAS_AUTHENTICATED,
        authenticated: authenticated,
        isAuthenticating: false
    };
}