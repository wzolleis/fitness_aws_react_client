// @flow
import type {Action, Exercise, Plan, ActionType} from '../types';

export const EXERCISE_SELECTED: string = 'EXERCISE_SELECTED';
export const PLAN_SELECTED: string = 'PLAN_SELECTED';
export const RESET_SELECTION: string = 'RESET_SELECTION';

export function exerciseSelected(exercise: Exercise): Action {
    resetSelection();
    return {
        type: 'EXERCISE_SELECTED',
        payload: exercise
    }
}

export function resetSelection(): Action {
    return {
        type: 'RESET_SELECTION',
        payload: {}
    };
}

export function planSelected(plan: Plan) {
    return {
        type: 'PLAN_SELECTED',
        payload: plan
    }
}
