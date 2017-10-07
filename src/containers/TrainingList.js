import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPlans} from "../actions/PlanActions";
import type {PlanState} from "../types/index";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import _ from 'lodash';

class TrainingList extends Component {

    componentWillMount() {
        this.props.fetchPlans();
    }

    renderPlans(plans: PlanState) {
        return _.map(plans, plan => {
            return <ListGroupItem key={plan.id}>
                Starte Training: {plan.name}</ListGroupItem>
        })
    }

    render() {
        console.log(this.props.plans);
        return (<div>
            <ListGroup>
                {this.renderPlans(this.props.plans)}
            </ListGroup>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        plans: state.plans
    }
}

export default connect(mapStateToProps, {fetchPlans})(TrainingList);