// @flow
import type {ExerciseId, PlanId} from "../types/index";
import _ from 'lodash';

export function calculateExerciseSelection(planId: PlanId, exerciseId: ExerciseId, exercises: ExerciseId[]): ExerciseId[] {
    let updatedExercises: ExerciseId[];

    if (exercises.includes(exerciseId)) {
        // exercise aus der Selektion rausnehmen
        updatedExercises = _.filter(exercises, exercise => exercise !== exerciseId);
    }
    else {
        // exercise in die Selektion einfuegen
        updatedExercises = _.concat(exercises, exerciseId);
    }
    return updatedExercises;
}