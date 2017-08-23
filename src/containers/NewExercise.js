import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import './NewExercise.css';
import {invokeApig} from "../libs/awsLib";
import {FieldGroup} from "../utils/FormUtils";

class NewExercise extends Component {
    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await this.createExercise({
                name: this.state.exercise.name,
                device: this.state.exercise.device,
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

        this.state = {
            isLoading: false,

            exercise: {
                name: '',
                device: '',
                muskelgruppe: '',
                type: ''
            }
        };
    }

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