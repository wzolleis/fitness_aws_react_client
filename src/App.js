import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {Nav, Navbar, NavItem} from 'react-bootstrap';

import './App.css';
import Routes from './Routes';
import RouteNavItem from './components/RouteNavItem';

class App extends Component {
    updateUserToken = (userToken) => {
        this.setState({
            userToken: userToken
        });
    };
    handleNavLink = (event) => {
        event.preventDefault();
        this.props.history.push(event.currentTarget.getAttribute('href'));
    };
    handleLogout = (event) => {
        this.updateUserToken(null);
    }

    constructor(props) {
        super(props);

        this.state = {
            userToken: null,
        };
    }

    render() {
        const childProps = {
            userToken: this.state.userToken,
            updateUserToken: this.updateUserToken,
        };

        return (
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

export default withRouter(App);