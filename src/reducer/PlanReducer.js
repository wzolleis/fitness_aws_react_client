import {FETCH_PLANS} from "../actions/PlanActions";
import {PlanState, Action} from '../types';

const initialState: PlanState = {
    plans: []
};

export const planReducer = (state: PlanState = initialState, action: Action): PlanState => {
    switch (action.type) {
        case FETCH_PLANS:
            return Object.assign({}, state, {
                plans: [...action.payload],
            });
        default:
            return state;
    }
};
