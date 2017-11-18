import React, {Component} from 'react';

class TrainingItem extends Component {
    render() {
        return (
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <a class="nav-link active" href="#">Active</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Link</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Disabled</a>
                        </li>
                    </ul>
                </div>
                <div class="card-body">
                    <h4 class="card-title">Card Title</h4>
                    <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut,
                        perspiciatis.</p>
                    <a href="#" class="btn btn-primary">Read More</a>
                </div>
            </div>

        )

    }
}

export default TrainingItem;