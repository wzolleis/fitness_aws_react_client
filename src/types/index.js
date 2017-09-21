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

export type PlanState = {
    plans: Plan[]
}
export type State = {
    plan: PlanState
};
