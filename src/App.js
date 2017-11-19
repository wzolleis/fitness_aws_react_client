import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import Routes from "./routes/Routes";
import {authUser, signOutUser} from "./libs/awsLib";
//import RouteNavItem from "./components/RouteNavItem";
import "./App.css";
import {userHasAuthenticated} from "./actions/UserActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Navigation from './Navigation';

class App extends Component {
    userHasAuthenticated = authenticated => {
        this.props.dispatchUserHasAuthenticated(authenticated);

    };

    handleLogout = event => {
        signOutUser();

        this.userHasAuthenticated(false);

        this.props.history.push("/login");
    };
    handleNavLink = (event) => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute('href'));
    };

    async componentDidMount() {
        try {
            if (await authUser()) {
                this.props.dispatchUserHasAuthenticated(true);
            }
            else {
                this.props.dispatchUserHasAuthenticated(false);
            }
        }
        catch (e) {
            alert(e);
            this.props.dispatchUserHasAuthenticated(false);
        }
    }

    render() {
        const childProps = {
            isAuthenticated: this.props.isAuthenticated,
            userHasAuthenticated: this.userHasAuthenticated
        };

        return (
            !this.props.isAuthenticating &&
            <div className="App container">
                <Navigation childProps={childProps}/>
                <Routes childProps={childProps}/>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        dispatchUserHasAuthenticated: userHasAuthenticated
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        isAuthenticating: state.user.isAuthenticating,
        isAuthenticated: state.user.isAuthenticated
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
