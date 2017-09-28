import type {ExerciseSelection, ExerciseId, Plan} from "../types/index";

export const PLAN_EXERCISE_SELECTION_CHANGED: string = 'PLAN_EXERCISE_SELECTION_CHANGED';

/**
 * es wurde ein Exercise fuer einen Plan ausgewaehlt
 * @param plan Der Plan
 * @param exercises Die Exercises als Objekt im Format {0: {}, 1: {})
 * @returns Der payload enthaelt den Plan mit den Exercise-Ids als string[]
 */
export function planExerciseSelectionChanged(plan: Plan, exercises: ExerciseSelection) {
    const flatEx: ExerciseId[] = {...exercises};
    return {
        type: PLAN_EXERCISE_SELECTION_CHANGED,
        payload: {
            plan,
            exercises: flatEx // exercise ids als array
        }
    }
}
