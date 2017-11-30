// @flow weak
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import type {Exercise, ExerciseId, State, Training} from "../types/index";
import _ from 'lodash';

type TrainingItemProps = {
    training: Training,
    allExercises: Exercise[],
    trainingExercises: Exercise[]
}

class TrainingItem extends Component<TrainingItemProps> {
    render() {
        return (
            <div>
                {this.props.trainingExercises.map((exercise, index) => {
                    return (<div key={exercise.id} className="card">
                        <div className="card-header">
                            <h4>{index + 1} - {exercise.name} - {exercise.weight}</h4>
                        </div>
                    </div>);
                })}
            </div>
        )

    }
}

function mapStateToProps(state: State, customProps) {
    const id: string = customProps.match.params.id ? customProps.match.params.id : ''; // from current url (react-router)
    const training: Training = state.training.trainings[id];
    const allExercises: Exercise[] = state.exercise.exercises;
    const trainingExercisesIds: ExerciseId[] = training ? training.exercises : [];
    const trainingExercises: Training[] = _.filter(allExercises, ex => {
        return trainingExercisesIds.indexOf(ex.id) !== -1;
    });

    return {
        isLoading: false,
        isDeleting: false,
        training,
        allExercises: state.exercise.exercises, // alle exercises
        trainingExercises,
        initialValues: {
            name: training ? training.name : '',
            createdAt: training ? training.createdAt : '',
            trainingExercises: []
        }
    }

}

export default withRouter(connect(mapStateToProps)(TrainingItem));