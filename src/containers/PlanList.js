import {connect} from 'react-redux';
import React, {Component} from 'react';

import {fetchPlans} from "../actions/PlanActions";
import type {Plan, PlanState} from "../types";
import {withRouter} from 'react-router-dom';


type PlanListProps = {
    plans: Plan[],
    fetchPlans: () => Plan[]
}

class PlanList extends Component<PlanListProps> {
    props: PlanListProps;

    componentDidMount() {
        this.props.fetchPlans();
    }

    handlePlanClick = (event) => {
        this.props.history.push(event.currentTarget.getAttribute('href'));
    };

    renderPlans = (plans: Plan[]) => {
        return plans.map(plan => {
            return (
                <div onClick={(event => this.handlePlanClick(event))}
                     key={plan.id}
                     href={`/plans/${plan.id}`}>
                    <li className='list-group-item'>
                        {plan.name} {plan.test}
                </li>
                </div>
            )
        })
    };

    render() {
        const {plans} : Plan[] = this.props;
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

function mapStateToProps({plan}: PlanState): PlanListProps {
    return {
        plans: plan.plans
    };
}

export default withRouter(connect(mapStateToProps, {fetchPlans})(PlanList))
