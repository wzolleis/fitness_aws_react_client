import type {Action, TrainingState} from "../types/index";
import {FETCH_TRAININGS} from "../actions/TrainingActions";
import _ from 'lodash';

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