// @flow
import {connect} from 'react-redux';
import React, {Component} from 'react';
import _ from 'lodash';
import type {Exercise, Plan, State} from '../types';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import type {ExerciseId, Exercises} from "../types/index";


export type ExerciseTableProps = {
    exercises: Exercise[],
    plan: Plan,
    selectedRowProp: any,
    options: any
};

type ExerciseTableData = {
    id: string,
    name: string,
    device: string,
    index: number,
    weight: string,
    selected: boolean
}

class ExerciseTable extends Component<ExerciseTableProps> {
    renderExerciseTable = () => {
        const col1: string = 'd-none d-sm-block';
        const col2: string = 'col-lg-5 col-md-7 col-sm-8 col-xs-8';
        const col3: string = 'col-lg-5 col-md-4 col-sm-4 col-xs-4';
        const exerciseTableData: ExerciseTableData[] = this.buildExerciseTableData(this.props.exercises, this.props.plan.exercises);
        const selectedTableData: ExerciseTableData[] = _.filter(exerciseTableData, exercise => {
            return exercise.selected === true
        });
        const sortedTableData: ExerciseTableData[] = _.orderBy(exerciseTableData, 'index');

        // Geraetenummer ist der Key in der Excercise-Tabelle
        const selectedDeviceNumbers: number[] = _.map(selectedTableData, 'device');

        const options = {
            ...this.props.options
        };

        const selectedRowProp = {
            ...this.props.selectedRowProp,
            mode: 'checkbox',
            clickToSelect: true,  // enable click to select
            selected: selectedDeviceNumbers
        };

        return (
            <BootstrapTable striped hover version='4' data={sortedTableData} selectRow={selectedRowProp}
                            options={options} condensed>
                <TableHeaderColumn className={col1} columnClassName={col1} isKey
                                   dataField='device'>Gerätenummer</TableHeaderColumn>
                <TableHeaderColumn className={col2} columnClassName={col2} dataField='name'>Name</TableHeaderColumn>
                <TableHeaderColumn className={col3} columnClassName={col3}
                                   dataField='weight'>Gewicht</TableHeaderColumn>
            </BootstrapTable>
        );
    };

    buildExerciseTableData = (exercises: Exercises, exerciseIds: ExerciseId[]): ExerciseTableData[] => {
        const exerciseTableData: ExerciseTableData[] = _.map(exercises, exercise => {
            const index: number = exerciseIds.findIndex(id => id === exercise.id);
            let selected = index >= 0;
            return {
                id: exercise.id,
                index,
                name: exercise.name,
                device: exercise.device,
                weight: exercise.weight,
                selected
            }
        });

        return exerciseTableData;
    };

    render() {

        return (
            <div>
                {this.renderExerciseTable()}
            </div>
        );
    }
}

function mapStateToProps(state: State, customProps): ExerciseTableProps {
    const {tableData, options, selectedRowProp, plan} = customProps;

    return {
        options,
        selectedRowProp,
        tableData,
        plan,
        exercises: state.exercise.exercises, // alle exercises
        initialValues: {
            name: plan ? plan.name : '',
            createdAt: plan ? plan.createdAt : '',
            selectedExercises: []
        }
    }
}

export default connect(mapStateToProps)(ExerciseTable);