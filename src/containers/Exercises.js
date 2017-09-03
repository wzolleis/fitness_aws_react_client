import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {invokeApig} from '../libs/awsLib';
import config from "../config";
import LoaderButton from "../components/LoaderButton";

class Exercises extends Component {
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
        let uploadedFilename;

        event.preventDefault();

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
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    saveExercise(exercise) {
        return invokeApig({
            path: config.apiPath.EXERCISES + `/${this.props.match.params.id}`,
            method: 'PUT',
            body: exercise,
        }, this.props.userToken);
    }

    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            isLoading: null,
            isDeleting: null,
            exercise: null,
            attachment: null,
            content: '',
        };
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
                exercise: results,
            });
        }
        catch (e) {
            alert(e);
        }
    }

    getExercise() {
        return invokeApig({path: `/exercises/${this.props.match.params.id}`}, this.props.userToken);
    }

    render() {
        if (!this.state.exercise) {
            return null;
        }

        return (
            <div className="Exercises">
                <form onSubmit={this.handleSubmit}>
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

export default withRouter(Exercises);