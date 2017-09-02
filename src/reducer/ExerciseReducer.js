import {REQUEST_EXERCISES} from "../actions/ExerciseActions";

const exerciseReducer = (state = {}, action) => {
    switch (action.type) {
        case REQUEST_EXERCISES:
            return Objects.assign({}, state, {
                isLoading: action.isLoading
            })
    }
};

export default exerciseReducer;