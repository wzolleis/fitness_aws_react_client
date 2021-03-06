// @flow
import {Field, Form, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import React, {Component} from 'react';
import _ from 'lodash';
import type {ContextRouter} from 'react-router-dom';
import type {Exercises, Exercise, Plan, State} from '../types';
import {fetchExercises} from "../actions/ExerciseActions";
import {fetchPlan, savePlan, updateExerciseSelection} from '../actions/PlanActions';
import LoaderButton from "../components/LoaderButton";
import type {FormProps} from 'redux-form';
import type {ExerciseId, PlanId} from "../types/index";
import ExerciseTable from "../components/ExerciseTable";
import {calculateExerciseSelection} from "../utils/PlanSelectionUtils";


export type PlanListItemProps = FormProps & {
    selectedExercises: Exercise[],
    selectedPlan: Plan,
    handleDelete: Plan => void,
    fetchExercises: () => void,
    fetchPlan: (string) => void
};

/**
 * component state
 */
type PlanListItemState = {
    isLoading: boolean,
    isDeleting: boolean,
}

type ExerciseTableData = {
    id: string,
    name: string,
    device: string,
    index: number,
    weight: string,
    selected: boolean
}

class PlanListItem extends Component<PlanListItemProps, PlanListItemState> {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPlan(id);
        this.props.fetchExercises();
    };

    // $FlowFixMe
    renderField = (field) => {
        return (
            <div className='form-group'>
                <label>{field.label}</label>
                <input className='form-control' type='text' {...field.input}/>
            </div>
        )
    };

    handleDelete = async (event) => {
        console.error('delete plan not implemented yet')
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            this.props.savePlan(this.props.selectedPlan);
            this.props.fetchPlan(this.props.selectedPlan.id);
            this.props.history.push('/');
        }
        catch (e) {
            alert(e);
            this.setState({isLoading: false});
        }
    };

    // FlowFixMe - event-type ist unbekannt
    updateExerciseSelection = (row) => {
        const exerciseId: ExerciseId = row.id;
        const planId: PlanId = this.props.match.params.id;

        const exercises: ExerciseId[] = this.props.selectedPlan.exercises;
        const updatedExercises = calculateExerciseSelection(planId, exerciseId, exercises);

        this.props.updateExerciseSelection(planId, exerciseId);

        this.props.blur('exercises', updatedExercises);
    };

    renderExerciseTable = () => {
        const selectRowProp = {
            onSelect: this.updateExerciseSelection
        };

        const options = {
            onRowClick: this.updateExerciseSelection
        };

        return (
            <ExerciseTable options={options} selectedRowProp={selectRowProp} plan={this.props.selectedPlan}/>
        );
    };

    buildExerciseTableData(exercises: Exercises): ExerciseTableData[] {
        return _.map(exercises, exercise => {
            const index = _.indexOf(this.props.selectedExercises, exercise.id);
            return {
                id: exercise.id,
                index,
                name: exercise.name,
                device: exercise.device,
                weight: exercise.weight,
                selected: index >= 0
            }
        });
    }

    render() {

        return (
            <div className='plan'>
                <Form onSubmit={this.handleSubmit}>
                    <Field name='name' id='selectedPlan.name' label='Name' component={this.renderField}/>
                    <Field name='createdAt' id='selectedPlan.createdAt' label='Angelegt' component={this.renderField}/>
                    <Field name='exercises' id='selectedPlan.exercises' component={this.renderExerciseTable}/>
                    <div className='buttons'>
                        <LoaderButton
                            block
                            bsStyle="primary"
                            bsSize="large"
                            type="submit"
                            isLoading={this.props.isLoading}
                            text="Save"
                            loadingText="Saving…"/>
                        <LoaderButton
                            block
                            bsStyle="danger"
                            bsSize="large"
                            isLoading={this.props.isDeleting}
                            onClick={this.handleDelete}
                            text="Delete"
                            loadingText="Deleting…"/>
                    </div>
                </Form>
            </div>
        );
    }
}

type PlanListItemCustomProps = ContextRouter;

function mapStateToProps(state: State, customProps: PlanListItemCustomProps) {
    const id: string = customProps.match.params.id ? customProps.match.params.id : ''; // from current url (react-router)
    const selectedPlan: Plan = state.plans[id];
    const selectedExercises: Exercise[] = selectedPlan ? selectedPlan.exercises : [];

    return {
        isLoading: false,
        isDeleting: false,
        selectedPlan,
        exercises: state.exercise.exercises, // alle exercises
        selectedExercises,
        initialValues: {
            name: selectedPlan ? selectedPlan.name : '',
            createdAt: selectedPlan ? selectedPlan.createdAt : '',
            selectedExercises: []
        }
    }
}

const PlanListItemForm = reduxForm(
    {form: 'PlanListItemForm'})(PlanListItem);

export default withRouter(connect(mapStateToProps, {
    fetchPlan,
    fetchExercises,
    savePlan,
    updateExerciseSelection
})(PlanListItemForm));