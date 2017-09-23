export const PLAN_EXERCISE_SELECTION_CHANGED = 'PLAN_EXERCISE_SELECTION_CHANGED';

export function planExerciseSelectionChanged(plan, exercises) {
    return {
        type: PLAN_EXERCISE_SELECTION_CHANGED,
        payload: {
            plan,
            ...exercises
        }
    }
}