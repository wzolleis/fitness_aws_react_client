// @flow weak
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchTrainings, startTraining} from "../actions/TrainingActions";
import type {Training, Trainings} from "../types/index";
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import _ from 'lodash';

class TrainingList extends Component {

    componentWillMount() {
        this.props.fetchTrainings();
    }

    renderTrainings(trainings: Trainings) {
        const buttonStyle = {
            margin: 5
        };
        return _.map(trainings, training => {
            return <ListGroupItem header={training.name} key={training.id}>
                <Button onClick={event => this.startTraining(event, training)}
                            style={buttonStyle} bsStyle="primary">Start...
                    </Button>
            </ListGroupItem>
        })
    }

    render() {
        return (<div>
            <ListGroup>
                {this.renderTrainings(this.props.trainings)}
            </ListGroup>
        </div>)
    }

    startTraining(event, training: Training) {
        if (event) {
            event.preventDefault();
        }
    }
}

function mapStateToProps(state) {
    console.log('state = ', state);
    return {
        trainings: state.training.trainings
    }
}

export default connect(mapStateToProps, {fetchTrainings, startTraining: startTraining})(TrainingList);