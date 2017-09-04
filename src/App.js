import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import {Nav, NavItem, Navbar} from "react-bootstrap";
import Routes from "./Routes";
import {authUser, signOutUser} from "./libs/awsLib";
import RouteNavItem from "./components/RouteNavItem";
import "./App.css";
import {userHasAuthenticated} from "./actions/UserActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

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

    constructor(props) {
        super(props);
    }

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
                <Navbar fluid collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Exercises</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle/>
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            {this.props.isAuthenticated
                                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                                : [
                                    <RouteNavItem key={1} href="/signup">
                                        Signup
                                    </RouteNavItem>,
                                    <RouteNavItem key={2} href="/login">
                                        Login
                                    </RouteNavItem>
                                ]}
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