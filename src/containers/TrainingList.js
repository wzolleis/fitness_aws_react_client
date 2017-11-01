// @flow weak
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPlans} from "../actions/PlanActions";
import {createTraining, startTraining, fetchTrainings} from "../actions/TrainingActions";
import type {Plan, PlanState, State, Training, TrainingState} from "../types/index";
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import _ from 'lodash';
import {withRouter} from "react-router-dom";
import {toDateString} from "../utils/DateUtils";

type TrainingListProps = {
    fetchPlans: () => void,
    createTraining: (event: any, plan: Plan) => void,
    startTraining: (event: any, plan: Plan) => void,
    fetchPlans: () => void,
    plans: PlanState,
    trainings: TrainingState
}

class TrainingList extends Component<TrainingListProps> {

    findTrainingByPlan: (plan: Plan) => Training = (plan) => {
        // Objekt mit den plan-ids als key und den trainings als value
        const trainingByPlan = _.mapKeys(this.props.trainings.trainings, 'plan');
        return trainingByPlan[plan.id];
    };

    trainingExists: (plan: Plan) => boolean = (plan) => {
        const trainingByPlan = this.findTrainingByPlan(plan);
        return trainingByPlan !== undefined;
    };

    trainingStarted: (training: Training) => boolean = (training) => {

    };

    componentWillMount() {
        this.props.fetchPlans();
        this.props.fetchTrainings();
    }


    renderPlans(plans: PlanState) {
        const buttonStyle = {
            margin: 5
        };


        return _.map(plans, plan => {
            const training = this.findTrainingByPlan(plan);

            if (this.trainingExists(plan)) {
                return <ListGroupItem header={plan.name} key={plan.id}>
                    <Button onClick={event => this.startTraining(event, plan)}
                            style={buttonStyle} bsStyle="success">Start...
                    </Button>
                </ListGroupItem>
            } else if (this.trainingStarted(training)) {

            }

            else {
                return <ListGroupItem header={plan.name} key={plan.id}>
                    <Button onClick={event => this.createTraining(event, plan)}
                            style={buttonStyle} bsStyle="primary">Create...
                    </Button>
                </ListGroupItem>
            }

        })
    }

    render() {
        return (<div>
            <ListGroup>
                {this.renderPlans(this.props.plans)}
            </ListGroup>
        </div>)
    }

    createTraining(event, plan: Plan) {
        if (event) {
            event.preventDefault();
            this.props.createTraining(plan);
            this.props.history.push("/");
        }
    }

    startTraining(event, training: Training) {
        if (event) {
            event.preventDefault();
            const now = new Date();
            console.log('now: ', toDateString(now));
            this.props.startTraining(training);
            this.props.history.push(`/training/${training.id}`);
        }
    }
}

function mapStateToProps(state: State) {
    return {
        plans: state.plans,
        trainings: state.training
    }
}

export default withRouter(connect(mapStateToProps, {
    fetchPlans,
    fetchTrainings,
    startTraining,
    createTraining
})(TrainingList));