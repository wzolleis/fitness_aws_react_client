import React, {Component} from 'react';

import {ListGroup, ListGroupItem} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {exerciseLabel} from "../utils/FormUtils";
import {withRouter} from "react-router-dom";
import {exerciseSelected} from "../actions/ExerciseActions";

class ExerciseItemListForm extends Component {
    mapExerciseToString = (exercise) => {
        return exerciseLabel(exercise);
    };

    handleExerciseClick = (event, exercise) => {
        if (event) {
            console.log(event);
            event.preventDefault();
            this.props.history.push(event.currentTarget.getAttribute('href'));
            this.props.exerciseSelected(exercise);
        }
    };

    renderExercisesList(exercises) {
        return [{}].concat(exercises).map((exercise, i) => (
            i !== 0
                ? ( <ListGroupItem
                    key={exercise.id}
                    href={`/exercises/${exercise.id}`}
                    onClick={(event) => this.handleExerciseClick(event, exercise)}
                    header={this.mapExerciseToString(exercise)}>
                    {exercise.muskelgruppe}
                </ListGroupItem> )
                : ( <ListGroupItem
                    key="new"
                    href="/exercises/new"
                    onClick={this.handleExerciseClick}>
                    <h4><b>{'\uFF0B'}</b> Create a new exercise</h4>
                </ListGroupItem> )
        ));
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


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        exerciseSelected: exerciseSelected
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        exercises: state.exercise.exercises ? state.exercise.exercises : [],
        activeExercise: state.exercise.activeExercise ? state.exercise.activeExercise : null
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExerciseItemListForm));