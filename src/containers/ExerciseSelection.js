import React, {Component} from 'react';
import {reduxForm} from "redux-form";
import {connect} from "react-redux";
import {planExerciseSelectionChanged} from "../actions/ExerciseSelectionActions";
import {fetchExercises} from "../actions/ExerciseActions";
import {fetchPlan} from "../actions/PlanActions";

class ExerciseSelection extends Component {
    componentDidMount() {
        this.props.fetchExercises();
    }

    render() {
        return (
            <div>
                <h3>Selection of Exercises!</h3>
            </div>
        )
    }
}

function mapStateToProps(state, customProps) {
    return {
        plan: customProps.plan
    };
}

const ExerciseSelectionForm = reduxForm(
    {form: 'ExerciseSelectionForm'}, mapStateToProps)(ExerciseSelection);

export default connect(mapStateToProps, {
    planExerciseSelectionChanged,
    fetchPlan,
    fetchExercises,
})(ExerciseSelectionForm);
