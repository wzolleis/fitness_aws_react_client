import React, {Component} from 'react';

import {ListGroup, ListGroupItem} from "react-bootstrap";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {exerciseLabel} from "../utils/FormUtils";

class ExerciseItemListForm extends Component {
    mapExerciseToString = (exercise) => {
        return exerciseLabel(exercise);
    };

    handleExerciseClick = (event) => {
        if (event) {
            event.preventDefault();
            this.props.history.push(event.currentTarget.getAttribute('href'));
        }
    };

    renderExercisesList(exercises) {
        return [{}].concat(exercises).map((exercise, i) => (
            i !== 0
                ? ( <ListGroupItem
                    key={exercise.id}
                    href={`/exercises/${exercise.id}`}
                    onClick={this.handleExerciseClick()}
                    header={this.mapExerciseToString(exercise)}>
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
    return bindActionCreators({}, dispatch);
};

function mapStateToProps(state) {
    return {
        exercises: state.exercise.exercises ? state.exercise.exercises : []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseItemListForm);