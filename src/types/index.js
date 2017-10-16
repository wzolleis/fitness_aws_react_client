// @flow
export type ActionType =
    'RECEIVE_EXERCISES_SUCCESS'
    | 'EXERCISE_DELETED'
    | 'EXERCISE_SAVED'
    | 'FETCH_EXERCISES'
    | 'EXERCISE_SELECTED'
    | 'RESET_SELECTION'
    | 'PLAN_SELECTED'
    | 'UPDATE_EXERCISE_SELECTION';

export type Action = {
    type: ActionType,
    payload: Object
}

export type PlanId = string;
export type ExerciseId = string;

export type Exercise = {
    id: ExerciseId,
    name: string,
    muskelgruppe: string,
    device: string,
    weight: string
};

export type Plan = {
    id: PlanId,
    name: string,
    exercises: ExerciseId[], // just the ids
    createdAt: string
};

/**
 * helper object to keep the exercises in the state
 */
export type Exercises = { [ExerciseId]: Exercise };

export type ExerciseState = {
    exercises: Exercises,
    isDeleting: boolean,
    isLoading: boolean,
};

/**
 * was ist aktuell selektiert
 */
export type SelectionState = {
    activeExercise: ?Exercise,
    activePlan: ?Plan
};

export type TrainingId = string;

export type Training = {
    id: TrainingId,
    name: string,
    plan: string,
    exercises: ExerciseId[],
    createdAt: string
}

export type Trainings = { [TrainingId]: Training };

export type TrainingState = {
    trainings: Trainings
};

// der Planstate ist ein Objekt mit den Plan-Objekten (Zugriff ueber die Plan-Id)
export type PlanState = { [id: string]: Plan };

/**
 * der komplette state
 */
export type State = {
    exercise: ExerciseState,
    plans: PlanState,
    training: TrainingState,
    selection: SelectionState,
};
