// @flow weak
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPlans} from "../actions/PlanActions";
import {createTraining, startTraining, fetchTrainings} from "../actions/TrainingActions";
import type {Plan, PlanState, State, Training, Trainings} from "../types/index";
import {withRouter} from "react-router-dom";
import _ from 'lodash';
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import {parseDateString} from "../utils/DateUtils";

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

    handleTrainingClick = (event, row) => {
        const path = '/trainings/' + event.id;
        this.props.history.push(path);
    };

    renderTrainings = (trainings: Trainings) => {
        const trainingItems: Training[] = _.sortBy(_.values(trainings), t => {
            return parseDateString(t.createdAt);
        });
        const options = {
            onRowClick: this.handleTrainingClick
        };
        return (
            <BootstrapTable options={options} striped hover version='4' data={trainingItems}>
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