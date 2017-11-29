// @flow weak
import {connect} from 'react-redux';
import React, {Component} from 'react';

import {fetchPlans} from "../actions/PlanActions";
import {planSelected} from "../actions/SelectionActions";
import {withRouter} from 'react-router-dom';
import * as _ from "lodash";
import type {Plan, PlanId, Training, Trainings} from "../types/index";
import {Button, Col, Grid, Row, Well} from "react-bootstrap";
import {createTraining, fetchTrainings} from "../actions/TrainingActions";
import {nowToDateString} from "../utils/DateUtils";

type PlanListProps = {
    plans: Plan[],
    trainings: Trainings
}

class PlanList extends Component<PlanListProps> {
    findTrainingForDate = (myDate: string, planId: PlanId): Training => {
        const trainingToday: Training[] = _.filter(this.props.trainings, t => {
            return t.plan === planId && t.createdAt === myDate
        });

        if (trainingToday.length > 0) {
            return trainingToday[0];
        }
        else {
            return null;
        }
    };

    handlePlanClick = (event, plan) => {
        this.props.planSelected(plan);
        this.props.history.push(event.currentTarget.getAttribute('href'));
    };

    startTraining = (event, plan: Plan) => {
        const trainingToday = this.findTrainingForDate(nowToDateString(), plan.id);
        if (trainingToday === null) {
            this.props.createTraining(plan);
            this.props.fetchTrainings();
            this.props.history.push('/trainings');
        }
        else {
            const path = '/trainings/' + trainingToday.id;
            this.props.history.push(path);
        }
    };

    componentDidMount() {
        this.props.fetchPlans();
        this.props.fetchTrainings();
    }

    mapPlanToComponent = (plan: Plan) => {
        return plan.id === 'new_plan' ?
            (<div key='new'
                  onClick={event => this.handlePlanClick(event, plan)}
                  href={'/plans/new'}>
                <Well>{plan.name}</Well>
            </div>) :
            (<div key={plan.id}
                  onClick={event => this.handlePlanClick(event, plan)}
                  href={`/plans/${plan.id}`}>
                <Well>{plan.name}</Well>
            </div>)
    };

    renderPlans = (plans) => {
        if (!plans) {
            return <div>Loading...</div>
        }

        const dummy: Plan = {
            id: 'new_plan',
            name: 'Neuer Plan...',
            exercises: [],
            createdAt: ''
        };
        const myPlans: Plan[] = {
            dummy,
            ...plans
        };
        const buttonStyle = {
            margin: 5
        };
        return _.map(myPlans, plan => {
            return <Grid key={plan.id}>
                <Row>
                    <Col xs={8} md={6}>
                        {this.mapPlanToComponent(plan)}
                    </Col>
                    <Col xs={4} md={6}>
                        <Button onClick={event => this.startTraining(event, plan)}
                                style={buttonStyle} bsStyle="success">Start...
                        </Button>
                    </Col>
                </Row>
            </Grid>
        });
    };

    render() {
        const {plans} = this.props;
        if (!plans) {
            return <div>Loading....</div>
        }
        return (
            <div>
                <h3>Plans</h3>
                {this.renderPlans(plans)}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {plans} = state;
    const trainings = state.training.trainings;
    return {plans, trainings};
}

export default withRouter(connect(mapStateToProps, {
    fetchPlans,
    fetchTrainings,
    createTraining,
    planSelected
})(PlanList))
