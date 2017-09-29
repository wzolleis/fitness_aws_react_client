// @flow
import {FETCH_PLAN, FETCH_PLANS, PLAN_SAVED} from "../actions/PlanActions";
import type {PlanState, Action} from '../types';
import _ from 'lodash';

const initialState: PlanState = {};

export const planReducer = (state: PlanState = initialState, action: Action): PlanState => {
    switch (action.type) {
        case FETCH_PLANS:
            const newPlans = _.mapKeys(action.payload, 'id');
            return {...state.plans, ...newPlans};
        case FETCH_PLAN:
            // FlowFixMe payload mit id definiert.
            return {...state, [action.payload.id]: action.payload};
        case PLAN_SAVED:
            return state;
        default:
            return state;
    }
};
