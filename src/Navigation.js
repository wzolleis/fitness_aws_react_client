import React, {Component} from 'react';

class Navigation extends Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark justify-content-end fixed-top mb-3">
                    <div className="container-fluid">
                        <button className="navbar-toggler" data-toggle='collapse' data-target='#navbarCcollapse'>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <a href="/" className="navbar-brand">Fitness</a>
                        <div className="collapse navbar-collapse" id='navbarCcollapse'>
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a href="/" className="nav-link">Exercises</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/plans" className="nav-link">Plans</a>
                                </li>
                                <li className="nav-item">
                                    <a href="/trainings" className="nav-link">Trainings</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Navigation;
