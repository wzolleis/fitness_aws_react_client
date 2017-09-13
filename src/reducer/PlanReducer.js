import {FETCH_PLANS} from "../actions/PlanActions";

const initialState = {
    plans: []
};

export const planReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLANS:
            return Object.assign({}, state, {
                plans: [...action.payload],
            });
        default:
            return state;
    }
};