import {connect} from 'react-redux';
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {fetchPlan} from '../actions/PlanActions';
import {Field, reduxForm} from 'redux-form';
import {fetchExercises} from "../actions/ExerciseActions";
import SelectedExerciseList from "./SelectedExerciseList";

class PlanListItem extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPlan(id);
        this.props.fetchExercises();
    }

    renderField = (field) => {
        return (
            <div className='form-group'>
                <label>{field.label}</label>
                <input className='form-control' type='text' {...field.input}/>
            </div>
        )
    };

    render() {

        return (
            <form>
                <Field name='name' id='selectedPlan.name' label='Name' component={this.renderField}/>
                <Field name='createdAt' id='selectedPlan.createdAt' label='Angelegt' component={this.renderField}/>
                <Field name='exerciseSelection' id='selectedPlan.exerciseSelection'
                       component={SelectedExerciseList} plan={this.props.selectedPlan}
                       exercises={this.props.exercises}/>

            </form>
        );
    }
}

function mapStateToProps(state, customProps) {
    const id = customProps.match.params.id;
    let selectedPlan = state.plans[id];

    return {
        selectedPlan,
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