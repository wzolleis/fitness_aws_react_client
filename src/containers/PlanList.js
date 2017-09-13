import React from 'react';
import {connect} from 'react-redux';
import {Component} from 'react';
import {fetchPlans} from "../actions/PlanActions";

class PlanList extends Component {
    componentDidMount() {
        this.props.fetchPlans();
    }

    renderPlans() {
        return this.props.plans.map(plan => {
            return (
                <li className='list-group-item' key={plan.id}>
                    {plan.name}
                </li>
            )
        })
    }

    render() {
        return (
            <div>
                <h3>Plans</h3>
                <ul className='list-group'>
                    {this.renderPlans()}
                </ul>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        plans: state.plan.plans
    };
}

export default connect(mapStateToProps, {fetchPlans})(PlanList)