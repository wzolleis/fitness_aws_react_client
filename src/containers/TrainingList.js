// @flow weak
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPlans} from "../actions/PlanActions";
import {startTraining} from "../actions/TrainingActions";
import type {Plan, PlanState} from "../types/index";
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import _ from 'lodash';

class TrainingList extends Component {

    componentWillMount() {
        this.props.fetchPlans();
    }

    renderPlans(plans: PlanState) {
        const buttonStyle = {
            margin: 5
        };
        return _.map(plans, plan => {
            return <ListGroupItem header={plan.name} key={plan.id}>
                <div>
                    <Button onClick={event => this.startTraining(event, plan)}
                            style={buttonStyle} bsStyle="primary">Start...
                    </Button>
                </div>
            </ListGroupItem>
        })
    }

    render() {
        return (<div>
            <ListGroup>
                {this.renderPlans(this.props.plans)}
            </ListGroup>
        </div>)
    }

    startTraining(event, plan: Plan) {
        if (event) {
            event.preventDefault();
        }
    }
}

function mapStateToProps(state) {
    return {
        plans: state.plans
    }
}

export default connect(mapStateToProps, {fetchPlans, startTraining: startTraining})(TrainingList);