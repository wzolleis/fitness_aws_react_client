import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import './NewExercise.css';
import {invokeApig} from "../libs/awsLib";
import {FieldGroup} from "../utils/FormUtils";
import type {Plan} from "../types/index";

class NewPlan extends Component {
    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({isLoading: true});

        try {
            await this.createPlan({
                name: this.state.plan.name,
                exercises: this.state.plan.exercises
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
            plan: {
                ...this.state.plan,
                [event.target.id]: event.target.value
            }
        };
        this.setState(state);
    };

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            plan: {
                name: '',
                exercises: []
            }
        };
    }

    validateForm() {
        return this.state.plan.name.length > 0;
    }

    createPlan(plan: Plan) {
        return invokeApig({
            path: '/plans',
            method: 'POST',
            body: plan,
        }, this.props.userToken);
    }


    render() {
        return (
            <div className="NewPlan">
                <form onSubmit={this.handleSubmit}>
                    <FieldGroup
                        id="name"
                        type="text"
                        label="Name"
                        value={this.state.plan.name}
                        onChange={this.handleChange}
                    />
                    <LoaderButton
                        block
                        bsStyle="primary"
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Create"
                        loadingText="Creating…"/>
                </form>
            </div>
        );
    }
}


export default withRouter(NewPlan);