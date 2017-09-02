import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class VisiblePlanList extends Component {
    render() {
        if (!this.state.plan) {
            return null;
        }

        return (
            <div className="Plans">
            </div>);

    }


}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
};

function mapStateToProps(state) {
    return {
        plans: state.plans ? state.plans : []
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VisiblePlanList);