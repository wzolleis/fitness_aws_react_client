import {connect} from 'react-redux';
import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {fetchPlan} from '../actions/PlanActions';
import {Field, reduxForm} from 'redux-form';
import ExerciseSelection from "./ExerciseSelection";

class PlanListItem extends Component {
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchPlan(id);
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
                       component={ExerciseSelection} plan={this.props.selectedPlan}/>
            </form>
        );
    }
}

function mapStateToProps({plans}, customProps) {
    const id = customProps.match.params.id;
    let selectedPlan = plans[id];

    return {
        selectedPlan,
        initialValues: {
            name: selectedPlan ? selectedPlan.name : '',
            createdAt: selectedPlan ? selectedPlan.createdAt : ''
        }
    }
}

const PlanListItemForm = reduxForm(
    {form: 'PlanListItemForm'}, mapStateToProps)(PlanListItem);

export default withRouter(connect(mapStateToProps, {fetchPlan})(PlanListItemForm));