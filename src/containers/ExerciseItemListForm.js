// @flow
import type {ExerciseState} from '../types';

import React, {Component} from 'react';

import {ListGroup, ListGroupItem} from "react-bootstrap";
import {connect} from "react-redux";
import {exerciseLabel} from "../utils/FormUtils";
import {withRouter} from "react-router-dom";
import {exerciseSelected} from "../actions/SelectionActions";
import _ from 'lodash';
import type {State, Exercise, Exercises} from "../types";
import type {ContextRouter} from 'react-router-dom';

type ExerciseItemListFormProps = ContextRouter & {
    activeExercise: Exercise,
    exercises: Exercises,
    exerciseSelected: Exercise => void
};

class ExerciseItemListForm extends Component<ExerciseItemListFormProps> {
    mapExerciseToString = (exercise: Exercise): string => {
        return exerciseLabel(exercise);
    };

    handleExerciseClick = (event: any, exercise: Exercise) => {
        if (event) {
            event.preventDefault();
            this.props.history.push(event.currentTarget.getAttribute('href'));
            this.props.exerciseSelected(exercise);
        }
    };

    renderExercisesList(exercises: Exercises) {
        // ein dummy-Objekt am Anfang einfuegen, damit unten daraus eine andere route fuer 'new' wird
        const new_exercise: Exercise = {
            id: 'create_new',
            device: 'dummy',
            weight: 'dummy',
            muskelgruppe: 'dummy',
            name: 'dummy'
        };
        const my_exercises: Exercises = {
            'create_new': new_exercise,
            ...exercises
        };
        return _.map(my_exercises, exercise => {
            return (
                exercise.id !== 'create_new' ?
                    (<ListGroupItem
                        key={exercise.id}
                        href={`/exercises/${exercise.id}`}
                        onClick={(event) => this.handleExerciseClick(event, exercise)}
                        header={this.mapExerciseToString(exercise)}>
                    </ListGroupItem>)
                    : (<ListGroupItem
                        key="new"
                        href="/exercises/new"
                        onClick={this.handleExerciseClick}>
                        <h4><b>{'\uFF0B'}</b> Create a new exercise</h4>
                    </ListGroupItem>))
        });
    }

    render() {
        if (!this.props.exercises) {
            return null;
        }

        return (
            <ListGroup>
                {this.renderExercisesList(this.props.exercises)}
            </ListGroup>);
    }
}

function mapStateToProps(state: State) {
    const activeExercise: ?Exercise = state.selection.activeExercise;
    const exerciseState: ExerciseState = state.exercise;
    const exercises: Exercises = exerciseState.exercises;
    return {
        exercises,
        activeExercise
    }
}

export default withRouter(connect(mapStateToProps, {exerciseSelected})(ExerciseItemListForm));
