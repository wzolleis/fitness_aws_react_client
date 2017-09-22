export const EXERCISE_SELECTED = 'EXERCISE_SELECTED';
export const PLAN_SELECTED = 'PLAN_SELECTED';
export const RESET_SELECTION = 'RESET_SELECTION';


export function exerciseSelected(exercise) {
    resetSelection();
    return {
        type: EXERCISE_SELECTED,
        payload: exercise
    }
}

export function resetSelection() {
    return {
        type: RESET_SELECTION,
        payload: null
    }
}

export function planSelected(plan) {
    return {
        type: PLAN_SELECTED,
        payload: plan
    }
}
