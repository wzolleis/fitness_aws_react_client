import {Field, Form, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {withRouter} from "react-router-dom";
import React, {Component} from 'react';
import _ from 'lodash';
import type {ContextRouter} from 'react-router-dom';
import type {Exercises, Plan, State} from '../types';
import {fetchExercises} from "../actions/ExerciseActions";
import {fetchPlan, savePlan} from '../actions/PlanActions';
import LoaderButton from "../components/LoaderButton";
import PlanExerciseSelectionForm from "./PlanExerciseSelection";
import SelectedExercisesList from '../components/selected_exercises_list';

type PlanListItemProps = FormProps & {
    handleDelete: Plan => void,
    selectedExercises: Exercises,
    fetchExercises: () => void,
    fetchPlan: (string) => void
};

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

    renderField = (field: Field) => {
        return (
            <div className='form-group'>
                <label>{field.label}</label>
                <input className='form-control' type='text' {...field.input}/>
            </div>
        )
    };

    handleDelete = async (event) => {

    }

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

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Field name='name' id='selectedPlan.name' label='Name' component={this.renderField}/>
                <Field name='createdAt' id='selectedPlan.createdAt' label='Angelegt' component={this.renderField}/>

                <h3>Auswahl</h3>
                <Field name='selectedExercises' id='selectedPlan.selectedExercises'
                       component={SelectedExercisesList}/>

                <hr/>
                <Field name='exerciseSelection' id='selectedPlan.exerciseSelection'
                       component={PlanExerciseSelectionForm} plan={this.props.selectedPlan}
                       exercises={this.props.exercises}/>
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
    const id: string = customProps.match.params.id; // from current url (react-router)
    let selectedPlan: Plan = state.plans[id];

    return {
        isLoading: false,
        isDeleting: false,
        selectedPlan,
        selectedExercises: state.exercise_selection,
        exercises: state.exercise.exercises,
        initialValues: {
            name: selectedPlan ? selectedPlan.name : '',
            createdAt: selectedPlan ? selectedPlan.createdAt : ''
        }
    }
}

const PlanListItemForm = reduxForm(
    {form: 'PlanListItemForm'}, mapStateToProps)(PlanListItem);

export default withRouter(connect(mapStateToProps, {fetchPlan, fetchExercises, savePlan})(PlanListItemForm));
