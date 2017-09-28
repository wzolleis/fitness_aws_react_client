// @flow
export type Action = {
    type: string,
    payload: ?any
}

export type ExerciseId = string;

export type Exercise = {
    id: ExerciseId,
    name: string,
    muskelgruppe: string,
    device: string,
    weight: string
};

export type PlanId = string;

export type Plan = {
    id: PlanId,
    name: string,
    exercises: string[], // just the ids
    createdAt: string
};


export type Exercises = { [string]: Exercise };

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
}

export type ExerciseSelection = {
    [index: number]: string
}

// der Planstate ist ein Objekt mit den Plan-Objekten (Zugriff ueber die Plan-Id)
export type PlanState = { [id: PlanId]: Plan };

// 0: "abc", 1: "xyz"
export type ExerciseSelectionState = ExerciseSelection;

export type State = {
    exercise: ExerciseState,
    plans: PlanState,
    selection: SelectionState,
    exercise_selection: Object
};
