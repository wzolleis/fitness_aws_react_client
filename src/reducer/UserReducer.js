import {RECEIVE_CURRENT_USER_SUCESS, REQUEST_CURRENT_USER, UPDATE_USER_TOKEN} from "../actions/UserActions";

const initialState = {
    userToken: null,
    isLoadingUserToken: true,
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_CURRENT_USER: {
            return Object.assign({}, state,
                {
                    isLoading: action.isLoading
                });
        }
        case RECEIVE_CURRENT_USER_SUCESS: {
            return Object.assign({}, state,
                {
                    isLoading: action.isLoading,
                    user: action.user
                });
        }
        case UPDATE_USER_TOKEN: {
            return Object.assign({}, state,
                {
                    userToken: action.userToken,
                    isLoadingUserToken: action.isLoadingUserToken
                });
        }

        default:
            return state;
    }
};

export default userReducer;