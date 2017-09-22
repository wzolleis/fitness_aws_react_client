import _ from 'lodash';
import {createSelector} from "reselect";

const exerciseSelector = state => state.exercise.exercises;

const selectedExerciseSelector = state => state.exercise_selection;

const getSelectedExercises = (exercises, selectedExerciseids) => {
    return _.filter(
        exercises,
        exercise => _.includes(selectedExerciseids, exercise.id)
    );
};

export default createSelector(
    exerciseSelector,
    selectedExerciseSelector,
    getSelectedExercises // this is the function with the logic
);