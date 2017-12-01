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
        const ex: Exercise[] = this.props.trainingExercises;
        return (
            <div id="accordion" role="tablist">
                {ex.map((exercise) => {
                    return (
                        <div key={exercise.id} className="card">
                            <div className="card-header" role="tab" id={exercise.id}>
                                <h2 className="mb-0">
                                    <a data-toggle="collapse" href={'#collapse_' + exercise.id} aria-expanded="true"
                                       aria-controls="collapseOne">
                                        {exercise.device} - {exercise.name} - {exercise.weight}
                                    </a>
                                </h2>
                            </div>
                            <div id={'collapse_' + exercise.id} className="collapse" role="tabpanel"
                                 aria-labelledby="headingOne"
                                 data-parent="#accordion">
                                <div className="card-body">
                                    <p>Name: {exercise.name}</p>
                                    <p>Gerät: {exercise.device}</p>
                                    <p>Gewicht: {exercise.weight}</p>
                                </div>
                            </div>
                        </div>);
                })}
            </div>
        );

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