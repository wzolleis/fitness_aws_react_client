import {connect} from 'react-redux';
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {fetchPlan} from '../actions/PlanActions';

class PlanListItem extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPlan(id);
    }

    render() {
        return (
            <div>
                <h3>Plan List Items!</h3>
            </div>
        );
    }
}

export default withRouter(connect(null, {fetchPlan})(PlanListItem));