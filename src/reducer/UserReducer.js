import {RECEIVE_CURRENT_USER_SUCESS, REQUEST_CURRENT_USER} from "../actions/UserActions";

const userReducer = (state = {}, action) => {
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

        default:
            return state;
    }
};

export default userReducer;