import React, {Component} from 'react';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {planExerciseSelectionChanged} from "../actions/ExerciseSelectionActions";
import CheckboxGroup from "../components/CheckBoxGroup";

class SelectedExerciseList extends Component {

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
                <h3>Selection of Exercises!</h3>
                <Field name="exercises" component={CheckboxGroup} options={this.props.exercises}
                       onSelectionChanged={this.onSelectionChanged}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        plan: state.selection.activePlan,
        exercises: state.exercise.exercises
    };
}

const SelectedExerciseListForm = reduxForm(
    {form: 'SelectedExerciseListForm'}, mapStateToProps)(SelectedExerciseList);

export default connect(mapStateToProps, {
    planExerciseSelectionChanged,
})(SelectedExerciseListForm);
