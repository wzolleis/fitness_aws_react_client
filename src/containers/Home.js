import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {PageHeader, ListGroup, ListGroupItem,} from 'react-bootstrap';
import './Home.css';
import config from "../config";
import {invokeApig} from "../libs/awsLib";
import {exerciseLabel} from "../utils/FormUtils";

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            exercises: [],
        };
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
        if (this.props.userToken === null) {
            return;
        }
        this.setState({isLoading: true});

        try {
            const results = await this.exercises();
            this.setState({exercises: results});
        }
        catch (e) {
            console.error(e);
            alert(e);
        }

        this.setState({isLoading: false});
    }

    exercises() {
        return invokeApig({path: config.apiPath.EXERCISES}, this.props.userToken);
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

    renderExercises() {
        return (
            <div className="exercises">
                <PageHeader>Your Exercises</PageHeader>
                <ListGroup>
                    {
                        this.renderExercisesList(this.state.exercises)}
                </ListGroup>
            </div>
        );
    }

    render() {
        return (
            <div className="Home">
                {this.props.userToken === null
                    ? Home.renderLander()
                    : this.renderExercises()}
            </div>
        );
    }
}

export default withRouter(Home);
