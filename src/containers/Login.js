import React, {Component} from 'react';
import {Button, FormGroup, FormControl, ControlLabel,} from 'react-bootstrap';
import './Login.css';
import config from '../config.js';
import {CognitoUserPool, AuthenticationDetails, CognitoUser} from 'amazon-cognito-identity-js';
import {withRouter} from "react-router-dom";

class Login extends Component {
    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const userToken = await this.login(this.state.username, this.state.password);
            this.props.updateUserToken(userToken);
            this.props.history.push('/');

        }
        catch (e) {
            alert(e);
        }
    };

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        };
    }

    validateForm() {
        return this.state.username.length > 0
            && this.state.password.length > 0;
    }

    login(username, password) {
        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });
        const authenticationData = {
            Username: username,
            Password: password
        };

        const user = new CognitoUser({Username: username, Pool: userPool});
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        return new Promise((resolve, reject) => (
            user.authenticateUser(authenticationDetails, {
                onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
                onFailure: (err) => reject(err),
            })
        ));
    };

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.username}
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"/>
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit">
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}

export default withRouter(Login);