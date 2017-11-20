// @flow weak
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPlans} from "../actions/PlanActions";
import {createTraining, startTraining, fetchTrainings} from "../actions/TrainingActions";
import type {Plan, PlanState, State, Training, Trainings} from "../types/index";
import {withRouter} from "react-router-dom";
import _ from 'lodash';
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";

type TrainingListProps = {
    fetchPlans: () => void,
    createTraining: (event: any, plan: Plan) => void,
    startTraining: (event: any, plan: Plan) => void,
    fetchPlans: () => void,
    plans: PlanState,
    trainings: Trainings
}

class TrainingList extends Component<TrainingListProps> {
    componentWillMount() {
        this.props.fetchPlans();
        this.props.fetchTrainings();
    }


    renderTrainings = (trainings: Trainings) => {
        const trainingItems: Training[] = _.values(trainings);
        return (
            <BootstrapTable striped hover version='4' data={trainingItems}>
                <TableHeaderColumn dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn isKey dataField='createdAt'>Start</TableHeaderColumn>
                <TableHeaderColumn dataField='finishedAt'>Beendet</TableHeaderColumn>
            </BootstrapTable>
        )
    };

    render() {
        return (
            <div>
                {this.renderTrainings(this.props.trainings)}
            </div>
        )
    }
}

function mapStateToProps(state: State) {
    return {
        plans: state.plans,
        trainings: state.training.trainings
    }
}

export default withRouter(connect(mapStateToProps, {
    fetchPlans,
    fetchTrainings,
    startTraining,
    createTraining
})(TrainingList));