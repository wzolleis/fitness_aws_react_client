import type {Action, TrainingState} from "../types/index";
import _ from 'lodash';
import {FETCH_TRAININGS} from "../types/index";

const initialState: TrainingState = {
    trainings: {}
};

export const trainingReducer = (state: TrainingState = initialState, action: Action): TrainingState => {
    switch (action.type) {
        case FETCH_TRAININGS:
            const newTrainings = _.mapKeys(action.payload, 'id');
            return {
                ...state,
                trainings: {...state.trainings, ...newTrainings}
            };
        default:
            return state;
    }
}