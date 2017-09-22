export type Action = {
    type: String,
    payLoad: Any
}

export type Exercise = {
    id: String,
    name: String,
    muskelgruppe: String,
    device: String,
    weight: String
};

export type Plan = {
    id: String,
    name: String,
    exercises: String[]
};

export type ExerciseState = {
    exercises: Object,
    isDeleting: boolean,
    isLoading: boolean,
};

export type SelectionState = {
    activeExercise: Object,
    activePlan: Object
}

export type PlanState = {
    // der Planstate ist ein Objekt mit den Plan-Objekten (Zugriff ueber die Plan-Id)
};

export type ExerciseSelectionState = {
    // 0: "abc", 1: "xyz"
}

export type State = {
    exercise: ExerciseState,
    plan: PlanState,
    selection: SelectionState,
};
