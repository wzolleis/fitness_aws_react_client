import React, {Component} from 'react';
import {exerciseLabel} from "../utils/FormUtils";
import {PageHeader, ListGroup, ListGroupItem,} from 'react-bootstrap';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class VisibleExerciseList extends Component {
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

    renderExercises() {
        console.info('renderExercises: isLoading = ' + this.state.isLoading);
        return (
            <div className="exercises">
                <PageHeader>Your Exercises</PageHeader>
                <ListGroup>
                    {this.renderExercisesList(this.state.exercises)}
                </ListGroup>
            </div>
        );
    }

    render() {
        return this.renderExercises();
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}

function mapStateToProps(state) {
    console.info('map state to props - exercises');
    return {
        plans: state.exercises ? state.exercises : []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisibleExerciseList);