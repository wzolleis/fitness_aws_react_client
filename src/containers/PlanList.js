import {connect} from 'react-redux';
import React, {Component} from 'react';

import {fetchPlans} from "../actions/PlanActions";
import {planSelected} from "../actions/SelectionActions";
import {withRouter} from 'react-router-dom';
import * as _ from "lodash";
import type {Plan} from "../types/index";
import {Button, Col, Grid, Row, Well} from "react-bootstrap";


class PlanList extends Component {
    componentDidMount() {
        this.props.fetchPlans();
    }

    handlePlanClick = (event, plan) => {
        this.props.planSelected(plan);
        this.props.history.push(event.currentTarget.getAttribute('href'));
    };

    startTraining = (event, plan) => {

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

function mapStateToProps({plans}) {
    return {plans};
}

export default withRouter(connect(mapStateToProps, {fetchPlans, planSelected})(PlanList))
