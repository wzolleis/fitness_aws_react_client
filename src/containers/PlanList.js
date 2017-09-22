import {connect} from 'react-redux';
import React, {Component} from 'react';

import {fetchPlans} from "../actions/PlanActions";
import {planSelected} from "../actions/SelectionActions";
import {withRouter} from 'react-router-dom';
import * as _ from "lodash";


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

        return _.map(plans, plan => {
            return (
                <div key={plan.id}
                     onClick={(event => this.handlePlanClick(event, plan))}
                     href={`/plans/${plan.id}`}>
                    <li className='list-group-item'>
                        {plan.name} {plan.test}
                    </li>
                </div>
            )
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
