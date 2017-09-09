import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {PageHeader} from 'react-bootstrap';
import './Home.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {exercises, receivedExercises} from "../actions/ExerciseActions";
import ExerciseItemListForm from "./ExerciseItemListForm";

class Home extends Component {

    async componentDidMount() {
        if (!this.props.isAuthenticated) {
            return;
        }

        try {
            const results = await exercises();
            this.props.receivedExercises(results);
        }
        catch (e) {
            console.error(e);
            alert(e);
        }
    }

    static renderLander() {
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

    static renderExercises() {
        return (
            <div className="exercises">
                <PageHeader>Your Exercises</PageHeader>
                <ExerciseItemListForm/>
            </div>
        );
    }

    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ? Home.renderExercises() : Home.renderLander()}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        receivedExercises: receivedExercises
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
