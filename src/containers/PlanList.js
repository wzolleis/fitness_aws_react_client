import {connect} from 'react-redux';
import React, {Component} from 'react';

import {fetchPlans} from "../actions/PlanActions";
import type {Plan, PlanState} from "../types";
import {withRouter} from 'react-router-dom';
import * as _ from "lodash";


type PlanListProps = {
    plans: {},
    fetchPlans: () => {}
}

class PlanList extends Component<PlanListProps> {
    props: PlanListProps;

    componentDidMount() {
        this.props.fetchPlans();
    }

    handlePlanClick = (event) => {
        this.props.history.push(event.currentTarget.getAttribute('href'));
    };

    renderPlans = (plans) => {
        return _.map(plans, plan => {
            return (
                <div key={plan.id}
                     onClick={(event => this.handlePlanClick(event))}
                     href={`/plans/${plan.id}`}>
                    <li className='list-group-item'>
                        {plan.name} {plan.test}
                    </li>
                </div>
            )
        });
    };

    render() {
        const {plans} : Plan[] = this.props;
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

function mapStateToProps({plans}: PlanState): PlanListProps {
    return {plans};
}

export default withRouter(connect(mapStateToProps, {fetchPlans})(PlanList))
