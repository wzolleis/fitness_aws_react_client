import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {planExerciseSelectionChanged} from "../actions/ExerciseSelectionActions";
import CheckboxGroup from "../components/CheckBoxGroup";
import SelectedExerciseSelector from '../selectors/selected_exercises';

class PlanExerciseSelection extends Component {

    /** Die Selektion der Exercise-Ids hat sich geaendert
     *
     * @param value Ein Object mit den Ids der selektierten Exercises (0: "abc", 1: "xyz")
     */
    onSelectionChanged = (value: String[]) => {
        this.props.planExerciseSelectionChanged(this.props.plan, value);
    };

    render() {
        return (
            <div>
                <h3>Exercises auswählen</h3>
                <Field name="exercises" component={CheckboxGroup} options={this.props.exercises}
                       onSelectionChanged={this.onSelectionChanged}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        plan: state.selection.activePlan,
        exercises: state.exercise.exercises,
        selectedExercises: SelectedExerciseSelector(state)
    };
}

const PlanExerciseSelectionForm = reduxForm(
    {form: 'SelectedExerciseListForm'}, mapStateToProps)(PlanExerciseSelection);

export default connect(mapStateToProps, {
    planExerciseSelectionChanged,
})(PlanExerciseSelectionForm);
