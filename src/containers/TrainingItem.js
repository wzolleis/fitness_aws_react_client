import React, {Component} from 'react';

class TrainingItem extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <ul className="nav nav-tabs card-header-tabs">
                        <li className="nav-item">
                            <a className="nav-link active" href="#">Active</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Disabled</a>
                        </li>
                    </ul>
                </div>
                <div className="card-body">
                    <h4 className="card-title">Card Title</h4>
                    <p className="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut,
                        perspiciatis.</p>
                    <a href="#" className="btn btn-primary">Read More</a>
                </div>
            </div>

        )

    }
}

export default TrainingItem;