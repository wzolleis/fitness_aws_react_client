import {connect} from 'react-redux';
import React, {Component} from 'react';

import {fetchPlans} from "../actions/PlanActions";
import {planSelected} from "../actions/SelectionActions";
import {withRouter} from 'react-router-dom';
import * as _ from "lodash";
import type {Plan} from "../types/index";


class PlanList extends Component {
    componentDidMount() {
        this.props.fetchPlans();
    }

    handlePlanClick = (event, plan) => {
        this.props.planSelected(plan);
        this.props.history.push(event.currentTarget.getAttribute('href'));
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

        return _.map(myPlans, plan => {
            return plan.id === 'new_plan' ?
                (<div key='new'
                      onClick={(event => this.handlePlanClick(event, plan))}
                      href={'/plans/new'}>
                    <li className='list-group-item'>
                        {plan.name}
                    </li>
                </div>) :
                (<div key={plan.id}
                     onClick={(event => this.handlePlanClick(event, plan))}
                     href={`/plans/${plan.id}`}>
                    <li className='list-group-item'>
                        {plan.name}
                    </li>
                </div>)
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
                <ul className='list-group'>
                    {this.renderPlans(plans)}
                </ul>
            </div>
        );
    }
}

function mapStateToProps({plans}) {
    return {plans};
}

export default withRouter(connect(mapStateToProps, {fetchPlans, planSelected})(PlanList))
