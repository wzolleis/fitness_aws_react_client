import React from 'react';
import SelectedExercisesSelector from '../selectors/selected_exercises';
import {connect} from "react-redux";

const SelectedExercisesList = (props) => {
    return (
        <ul className='list-group'>
            {
                props.exercises.map(exercise => {
                    return <li className='list-group-item' key={exercise.id}>{exercise.name}</li>
                })
            }
        </ul>
    );

};

const mapStateToProps = state => {
    const exercises = SelectedExercisesSelector(state);
    return {
        exercises
    }
};

export default connect(mapStateToProps)(SelectedExercisesList);