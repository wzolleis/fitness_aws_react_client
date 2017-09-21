import {FETCH_PLAN, FETCH_PLANS} from "../actions/PlanActions";
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
        case FETCH_PLAN:
            return Object.assign({}, state, {
                plans: state.plans.map(item => item.id === action.payload.id ?
                    // transform the one with a matching id
                    {...action.payLoad} :
                    item
                )
            });
        default:
            return state;
    }
};
