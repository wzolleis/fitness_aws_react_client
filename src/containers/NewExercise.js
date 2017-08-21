import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
    FormGroup,
    FormControl,
    ControlLabel, HelpBlock,
} from 'react-bootstrap';
import LoaderButton from '../components/LoaderButton';
import config from '../config.js';
import './NewExercise.css';
import {invokeApig, s3Upload} from "../libs/awsLib";
import {FieldGroup} from "../utils/FormUtils";

class NewExercise extends Component {
    handleSubmit = async (event) => {
        event.preventDefault();

        if (this.file && this.file.size > config.MAX_ATTACHMENT_SIZE) {
            alert('Please pick a file smaller than 5MB');
            return;
        }

        this.setState({ isLoading: true });

        try {
            const uploadedFilename = (this.file)
                ? (await s3Upload(this.file, this.props.userToken)).Location
                : null;

            await this.createExercise({
                content: this.state.content,
                name: this.state.name,
                device: this.state.device,
                attachment: uploadedFilename,
            });
            this.props.history.push('/');
        }
        catch (e) {
            alert(e);
            this.setState({isLoading: false});
        }

    };

    constructor(props) {
        super(props);

        this.file = null;

        this.state = {
            isLoading: null,

            content: '',
            exercise: {
                name: ''
            }
        };
    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleFileChange = (event) => {
        this.file = event.target.files[0];
    };

    validateForm() {
        return this.state.exercise.name.length > 0;
    }


    createExercise(exercise) {
        return invokeApig({
            path: '/exercises',
            method: 'POST',
            body: exercise,
        }, this.props.userToken);
    }

    render() {
        return (
            <div className="NewExercise">
                <form onSubmit={this.handleSubmit}>
                    <FieldGroup
                        id="name"
                        type="text"
                        label="Text"
                        placeholder="Name"
                        onChange={this.handleChange}
                    />
                    <FieldGroup
                        id="device"
                        type="text"
                        label="Gerät"
                        placeholder="Gerätenummer"
                        onChange={this.handleChange}
                    />

                    <FormGroup controlId="file">
                        <ControlLabel>Attachment</ControlLabel>
                        <FormControl
                            onChange={this.handleFileChange}
                            type="file" />
                    </FormGroup>
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={ ! this.validateForm() }
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Create"
                        loadingText="Creating…" />
                </form>
            </div>
        );
    }
}


export default withRouter(NewExercise);