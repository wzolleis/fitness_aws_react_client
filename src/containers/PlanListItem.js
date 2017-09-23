import {connect} from 'react-redux';
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {fetchPlan} from '../actions/PlanActions';
import {Field, reduxForm} from 'redux-form';
import {fetchExercises} from "../actions/ExerciseActions";
import PlanExerciseSelectionForm from "./PlanExerciseSelection";
import SelectedExercisesList from '../components/selected_exercises_list';
import LoaderButton from "../components/LoaderButton";
import type {State} from "../types/index";

class PlanListItem extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPlan(id);
        this.props.fetchExercises();
    }

    componentDidUpdate = (prevProps, nextProps) => {
        if (prevProps.selectedPlan === null && nextProps.selectedPlan !== null) {
            this.props.change('name', nextProps.selectedPlan.name);
            this.props.change('createdAt', nextProps.selectedPlan.createdAt);
        }
    };

    renderField = (field) => {
        return (
            <div className='form-group'>
                <label>{field.label}</label>
                <input className='form-control' type='text' {...field.input}/>
            </div>
        )
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await this.savePlan({
                ...this.props.selectedPlan,
            });
            this.props.history.push('/');
        }
        catch (e) {
            alert(e);
            this.setState({isLoading: false});
        }
    };

    render() {

        return (
            <form onSubmit={this.handleSubmit}>
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

            </form>
        );
    }
}

function mapStateToProps(state: State, customProps) {
    const id = customProps.match.params.id; // from current url (react-router)
    let selectedPlan = state.plans[id];

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

export default withRouter(connect(mapStateToProps, {fetchPlan, fetchExercises})(PlanListItemForm));