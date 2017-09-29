// @flow
import {Field, Form, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import React, {Component} from 'react';
import _ from 'lodash';
import type {ContextRouter} from 'react-router-dom';
import type {Exercises, ExerciseId, Exercise, Plan, State} from '../types';
import {fetchExercises} from "../actions/ExerciseActions";
import {fetchPlan, savePlan, updateExerciseSelection} from '../actions/PlanActions';
import LoaderButton from "../components/LoaderButton";
import type {FormProps} from 'redux-form';

type PlanListItemProps = FormProps & {
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
            this.props.savePlan(
                this.props.selectedPlan,
                _.values(this.props.selectedExercises)
                ,
            );
            this.props.history.push('/plans');
        }
        catch (e) {
            alert(e);
            this.setState({isLoading: false});
        }
    };

    isExerciseSelected: Exercise => boolean = (exercise) => {
        return !_.isNil(_.find(this.props.selectedExercises, {id: exercise.id}));
    };

    // FlowFixMe - event-type ist unbekannt
    updateExerciseSelection = (event) => {
        const id = '';
        this.props.updateExerciseSelection(id);
    };

    renderExercisesList(exercises: Exercises) {
        return _.map(exercises, exercise => {
            const className: string = this.isExerciseSelected(exercise) ? 'list-group-item active' : 'list-group-item';
            return (
                <li className="list-group-item active" key={exercise.id}
                    onSelect={this.updateExerciseSelection(exercise.id)}>
                    {exercise.name}
                </li>
            )
        });
    }


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Field name='name' id='selectedPlan.name' label='Name' component={this.renderField}/>
                <Field name='createdAt' id='selectedPlan.createdAt' label='Angelegt' component={this.renderField}/>
                <ul className="list-group">
                    {this.renderExercisesList(this.props.exercises)}
                </ul>
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

            </Form>
        );
    }
}

type PlanListItemCustomProps = ContextRouter;

function mapStateToProps(state: State, customProps: PlanListItemCustomProps) {
    const id: string = customProps.match.params.id ? customProps.match.params.id : ''; // from current url (react-router)
    const selectedPlan: Plan = state.plans[id];
    const selectedExercises: Exercise[] = [];

    return {
        isLoading: false,
        isDeleting: false,
        selectedPlan,
        exercises: state.exercise.exercises,
        selectedExercises,
        initialValues: {
            name: selectedPlan ? selectedPlan.name : '',
            createdAt: selectedPlan ? selectedPlan.createdAt : ''
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
