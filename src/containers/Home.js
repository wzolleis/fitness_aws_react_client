import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {PageHeader, ListGroup, ListGroupItem,} from 'react-bootstrap';
import './Home.css';
import config from "../config";
import {invokeApig} from "../libs/awsLib";
import {exerciseLabel} from "../utils/FormUtils";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {exercises, receivedExercises} from "../actions/ExerciseActions";

class Home extends Component {
    constructor(props) {
        super(props);
    }

    mapExerciseToString = (exercise) => {
        return exerciseLabel(exercise);
    };
    handleExerciseClick = (event) => {
        if (event) {
            event.preventDefault();
            this.props.history.push(event.currentTarget.getAttribute('href'));
        }
    };



    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const results = await exercises();
            this.props.dispatchReceivedExercises(results);
        }
        catch (e) {
            console.error(e);
            alert(e);
        }
    }

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

    renderLander() {
        return (
            <div className="lander">
                <h1>Fitness</h1>
                <p>A simple exercise management app</p>
                <div>
                    <Link to="/login" className="btn btn-info btn-lg">Login</Link>
                    <Link to="/signup" className="btn btn-success btn-lg">Signup</Link>
                </div>
            </div>
        );
    }

    renderExercises() {
        return (
            <div className="exercises">
                <PageHeader>Your Exercises</PageHeader>
                <ListGroup>
                    {this.renderExercisesList(this.props.exercises)}
                </ListGroup>
            </div>
        );
    }

    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ? this.renderExercises() : this.renderLander()}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        dispatchReceivedExercises: receivedExercises
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        isAuthenticating: state.user.isAuthenticating,
        isAuthenticated: state.user.isAuthenticated,
        exercises: state.exercise.exercises
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
