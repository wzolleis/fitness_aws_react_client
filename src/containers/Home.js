import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {
    PageHeader,
    ListGroup,
} from 'react-bootstrap';
import './Home.css';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            notes: [],
        };
    }

    renderExercisesList(notes) {
        return null;
    }

    renderLander() {
        return (
            <div className="lander">
                <h1>Scratch</h1>
                <p>A simple note taking app</p>
            </div>
        );
    }

    renderExercises() {
        return (
            <div className="exercises">
                <PageHeader>Your Exercises</PageHeader>
                <ListGroup>
                    {!this.state.isLoading
                    && this.renderExercisesList(this.state.notes)}
                </ListGroup>
            </div>
        );
    }

    render() {
        return (
            <div className="Home">
                {this.props.userToken === null
                    ? this.renderLander()
                    : this.renderExercises()}
            </div>
        );
    }
}

export default withRouter(Home);
