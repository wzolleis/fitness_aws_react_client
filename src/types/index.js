// @flow

export const START_TRAINING: string = 'START_TRAINING';
export const FETCH_TRAININGS: string = 'FETCH_TRAININGS';
export const SAVE_TRAINING: string = 'SAVE_TRAINING';

export type ActionType =
    'RECEIVE_EXERCISES_SUCCESS'
    | 'EXERCISE_DELETED'
    | 'EXERCISE_SAVED'
    | 'FETCH_EXERCISES'
    | 'EXERCISE_SELECTED'
    | 'RESET_SELECTION'
    | 'PLAN_SELECTED'
    | 'UPDATE_EXERCISE_SELECTION'
    | 'FETCH_TRAININGS'
    | 'SAVE_TRAINING'
    | START_TRAINING;

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
export type Execution = string;

export type Training = {
    id: TrainingId,
    name: string,
    plan: string,
    executions: Execution[],
    exercises: ExerciseId[],
    createdAt: string
}

//
/**
 * Trainings ist ein Objekt mit der Training-Id als key und dem Training als Value.
 *
 */
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
