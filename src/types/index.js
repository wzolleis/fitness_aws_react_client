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
    activeExercise: Object
};

export type PlanState = {
    plans: Object
}
export type State = {
    exercise: ExerciseState,
    plan: PlanState
};
