export const EXERCISE_SELECTED = 'EXERCISE_SELECTED';
export const PLAN_SELECTED = 'PLAN_SELECTED';


export function exerciseSelected(exercise) {
    return {
        type: EXERCISE_SELECTED,
        payload: exercise
    }
}

export function planSelected(plan) {
    return {
        type: PLAN_SELECTED,
        payload: plan
    }
}
