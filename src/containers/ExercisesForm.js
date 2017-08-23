import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {invokeApig} from '../libs/awsLib';
import config from "../config";
import LoaderButton from "../components/LoaderButton";
import {FieldGroup} from "../utils/FormUtils";

class ExercisesForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            isDeleting: false,
            exercise: {
                name: '',
                muskelgruppe: '',
                device: '',
                type: ''
            }
        };
    }

    handleDelete = async (event) => {
        event.preventDefault();

        const confirmed = window.confirm('Are you sure you want to delete this exercise?');

        if (!confirmed) {
            return;
        }

        this.setState({isDeleting: true});

        try {
            await this.deleteExercise();
            this.props.history.push('/');
        }
        catch (e) {
            alert(e);
            this.setState({isDeleting: false});
        }
    };

    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert('Please pick a file smaller than 5MB');
            return;
        }

        this.setState({isLoading: true});

        try {
            await this.saveExercise({
                ...this.state.exercise,
            });
            this.props.history.push('/');
        }
        catch (e) {
            alert(e);
            this.setState({isLoading: false});
        }
    };

    handleChange = (event) => {
        let state = {
            ...this.state,
            exercise: {
                ...this.state.exercise,
                [event.target.id]: event.target.value
            }
        };
        this.setState(state);
    };

    saveExercise(exercise) {
        return invokeApig({
            path: config.apiPath.EXERCISES + `/${this.props.match.params.id}`,
            method: 'PUT',
            body: exercise,
        }, this.props.userToken);
    }

    deleteExercise() {
        return invokeApig({
            path: config.apiPath.EXERCISES + `/${this.props.match.params.id}`,
            method: 'DELETE',
        }, this.props.userToken);
    }

    async componentDidMount() {
        try {
            const results = await this.getExercise();
            this.setState({
                exercise: results
            });
        }
        catch (e) {
            alert(e);
        }
    }

    getExercise() {
        return invokeApig({path: `/exercises/${this.props.match.params.id}`}, this.props.userToken);
    }

    validateForm() {
        return this.state.exercise.name.length > 0;
    }

    render() {
        if (!this.state.exercise) {
            return null;
        }

        return (
            <div className="Exercises">
                <form onSubmit={this.handleSubmit}>
                    <FieldGroup
                        id="name"
                        type="text"
                        label="Name"
                        value={this.state.exercise.name}
                        onChange={this.handleChange}
                    />
                    <FieldGroup
                        id="device"
                        type="text"
                        label="Gerät"
                        value={this.state.exercise.device}
                        onChange={this.handleChange}
                    />
                    <FieldGroup
                        id="muskelgruppe"
                        type="text"
                        label="Muskelgruppe"
                        value={this.state.exercise.muskelgruppe}
                        onChange={this.handleChange}
                    />
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Save"
                        loadingText="Saving…"/>
                    <LoaderButton
                        block
                        bsStyle="danger"
                        bsSize="large"
                        isLoading={this.state.isDeleting}
                        onClick={this.handleDelete}
                        text="Delete"
                        loadingText="Deleting…"/>
                </form>
            </div>
        );
    }
}

export default withRouter(ExercisesForm);