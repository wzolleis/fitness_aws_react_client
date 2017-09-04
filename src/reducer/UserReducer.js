import {USER_HAS_AUTHENTICATED} from "../actions/UserActions";

const initialState = {
    isAuthenticated: false,
    isAuthenticating: true
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_HAS_AUTHENTICATED:
            return Object.assign({}, state, {
                isAuthenticated: action.authenticated,
                isAuthenticating: action.isAuthenticating
            });
        default:
            return state;
    }
};

export default userReducer;