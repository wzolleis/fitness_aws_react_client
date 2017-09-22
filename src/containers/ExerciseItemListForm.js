import React, {Component} from 'react';

import {ListGroup, ListGroupItem} from "react-bootstrap";
import {connect} from "react-redux";
import {exerciseLabel} from "../utils/FormUtils";
import {withRouter} from "react-router-dom";
import {exerciseSelected} from "../actions/SelectionActions";
import _ from 'lodash';

class ExerciseItemListForm extends Component {
    mapExerciseToString = (exercise) => {
        return exerciseLabel(exercise);
    };

    handleExerciseClick = (event, exercise) => {
        if (event) {
            event.preventDefault();
            this.props.history.push(event.currentTarget.getAttribute('href'));
            this.props.exerciseSelected(exercise);
        }
    };

    renderExercisesList(exercises) {
        // ein dummy-Objekt am Anfang einfuegen, damit unten daraus eine andere route fuer 'new' wird
        const my_exercises = {
            'create_new': {
                id: 'create_new'
            },
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

function mapStateToProps(state) {
    return {
        exercises: state.exercise.exercises,
        activeExercise: state.selection.activeExercise
    }
}

export default withRouter(connect(mapStateToProps, {exerciseSelected})(ExerciseItemListForm));