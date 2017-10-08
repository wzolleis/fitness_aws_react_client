import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPlans} from "../actions/PlanActions";
import type {PlanState} from "../types/index";
import {Grid, Col, Row, Button} from "react-bootstrap";
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
            return <Row key={plan.id} className="show-grid">
                <Col xs={12} md={8}>{plan.name}</Col>
                <Col xs={6} md={4}>

                    <Button style={buttonStyle} bsStyle="primary">Start...</Button>
                </Col>
            </Row>
        })
    }

    render() {
        console.log(this.props.plans);
        return (<div>
            <Grid>
                {this.renderPlans(this.props.plans)}
            </Grid>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        plans: state.plans
    }
}

export default connect(mapStateToProps, {fetchPlans})(TrainingList);