import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {invokeApig, s3Upload} from '../libs/awsLib';
import config from "../config";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
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
    }

    handleSubmit = async (event) => {
        let uploadedFilename;

        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert('Please pick a file smaller than 5MB');
            return;
        }

        this.setState({isLoading: true});

        try {

            if (this.file) {
                uploadedFilename = (await s3Upload(this.file, this.props.userToken)).Location;
            }

            await this.saveExercise({
                ...this.state.exercise,
                content: this.state.content,
                attachment: uploadedFilename || this.state.exercise.attachment,
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
    handleFileChange = (event) => {
        this.file = event.target.files[0];
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
                content: results.content,
                attachment: results.attachment
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
        return this.state.content.length > 0;
    }

    formatFilename(str) {
        return (str.length < 50)
            ? str
            : str.substr(0, 20) + '...' + str.substr(str.length - 20, str.length);
    }

    render() {
        if (!this.state.exercise) {
            return null;
        }

        return (
            <div className="Exercises">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="content">
                        <FormControl
                            onChange={this.handleChange}
                            value={this.state.content}
                            componentClass="textarea"/>
                    </FormGroup>
                    {this.state.exercise.attachment &&
                    ( <FormGroup>
                        <ControlLabel>Attachment</ControlLabel>
                        <FormControl.Static>
                            <a target="_blank" rel="noopener noreferrer" href={this.state.exercise.attachment}>
                                {this.formatFilename(this.state.exercise.attachment)}
                            </a>
                        </FormControl.Static>
                    </FormGroup> )}
                    <FormGroup controlId="file">
                        {!this.state.exercise.attachment &&
                        <ControlLabel>Attachment</ControlLabel>}
                        <FormControl
                            onChange={this.handleFileChange}
                            type="file"/>
                    </FormGroup>
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