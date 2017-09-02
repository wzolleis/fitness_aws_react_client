import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Nav, Navbar, NavItem} from 'react-bootstrap';

import './App.css';
import Routes from './Routes';
import {CognitoUserPool,} from 'amazon-cognito-identity-js';
import AWS from 'aws-sdk';
import config from './config.js';
import RouteNavItem from './components/RouteNavItem';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchCurrentUser} from "./actions/UserActions";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userToken: null,
            isLoadingUserToken: true,
        };
    }

    handleLogout = (event) => {
        const currentUser = this.getCurrentUser();

        if (currentUser !== null) {
            currentUser.signOut();
        }
        if (AWS.config.credentials) {
            AWS.config.credentials.clearCachedId();
        }
        this.updateUserToken(null);
        this.props.history.push('/login');
    };

    updateUserToken = (userToken) => {
        this.setState({
            userToken: userToken
        });
    };

    handleNavLink = (event) => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute('href'));
    };

    getCurrentUser() {
        this.props.executeFetchCurrentUser();

        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });
        return userPool.getCurrentUser();
    }

    getUserToken(currentUser) {
        return new Promise((resolve, reject) => {
            currentUser.getSession(function (err, session) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(session.getIdToken().getJwtToken());
            });
        });
    }

    async componentDidMount() {
        const currentUser = this.getCurrentUser();

        if (currentUser === null) {
            this.setState({isLoadingUserToken: false});
            return;
        }

        try {
            const userToken = await this.getUserToken(currentUser);
            this.updateUserToken(userToken);
        }
        catch (e) {
            alert(e);
        }

        this.setState({isLoadingUserToken: false});
    }

    render() {
        const childProps = {
            userToken: this.state.userToken,
            updateUserToken: this.updateUserToken,
        };

        return !this.state.isLoadingUserToken
            &&
            (
                <div className="App container">
                    <Navbar fluid collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <Link to="/">Exercises</Link>
                            </Navbar.Brand>
                            <Navbar.Toggle/>
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav pullRight>
                                {this.state.userToken
                                    ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                                    : [<RouteNavItem key={1} onClick={this.handleNavLink}
                                                     href="/signup">Signup</RouteNavItem>,
                                        <RouteNavItem key={2} onClick={this.handleNavLink}
                                                      href="/login">Login</RouteNavItem>]}
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Routes childProps={childProps}/>
                </div>
            );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        executeFetchCurrentUser: fetchCurrentUser
    }, dispatch);
};

function mapStateToProps(state) {
    return {}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));