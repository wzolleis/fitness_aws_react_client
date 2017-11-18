// @flow weak
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPlans} from "../actions/PlanActions";
import {createTraining, startTraining, fetchTrainings} from "../actions/TrainingActions";
import type {Plan, PlanState, State, Training, Trainings, TrainingState} from "../types/index";
import {Button, ListGroup, ListGroupItem, MenuItem, SplitButton} from "react-bootstrap";
import _ from 'lodash';
import {withRouter} from "react-router-dom";
import {parseDateString, toDateString} from "../utils/DateUtils";
import moment from "moment";

type TrainingListProps = {
    fetchPlans: () => void,
    createTraining: (event: any, plan: Plan) => void,
    startTraining: (event: any, plan: Plan) => void,
    fetchPlans: () => void,
    plans: PlanState,
    trainings: TrainingState
}

class TrainingList extends Component<TrainingListProps> {

    findTrainingByPlan: (plan: Plan) => Training = (plan) => {
        // Objekt mit den plan-ids als key und den trainings als value
        const trainingByPlan = _.mapKeys(this.props.trainings.trainings, 'plan');
        return trainingByPlan[plan.id];
    };

    doesTrainingExist: (training: Training) => boolean = (training) => {
        return training !== undefined;
    };

    isTrainingStarted: (training: Training) => boolean = (training) => {
        if (training && training.createdAt) {
            const now: Date = new Date();
            const trainingStart: Date = parseDateString(training.createdAt);
            return moment(now).isAfter(trainingStart);
        }
        return false;
    };

    isTrainingFinished: (training: Training) => boolean = (training) => {
        return (training && training.finishedAt);
    };

    componentWillMount() {
        this.props.fetchPlans();
        this.props.fetchTrainings();
    }

    /**
     * Rendering der Trainings
     * @param trainings Alle Trainings (fuer jeden Plan gibt es ein Training)
     */
    renderTrainings(trainings: Trainings) {
        const buttonStyle = {
            margin: 5
        };

        const components =
            _.map(_.values(trainings), training => {
                if (this.isTrainingFinished(training)) {
                    return <ListGroupItem header={training.name} key={training.id}>
                        <Button onClick={event => this.startTraining(event, training)}
                                style={buttonStyle} bsStyle="success">Start...
                        </Button>
                    </ListGroupItem>
                }
                else if (this.isTrainingStarted(training)) {
                    return <ListGroupItem header={training.name} key={training.id}>
                        <Button onClick={event => this.continueTraining(event, training)}
                                style={buttonStyle} bsStyle="primary">Continue...
                        </Button>
                    </ListGroupItem>
                }
                else {
                    return null;
                }
            });


        return components;
    }

    /**
     * Suche nach Plaenen, die keinen Eintrag in den Trainings besitzen
     * @param plans Die Plaene
     * @return Die Plaene, die kein Training besitzten
     */
    findPlansWithoutTraining(plans: PlanState): Plan[] {
        const planList: Plan[] = _.values(plans);
        return _.filter(planList, p => {
            return !this.doesTrainingExist(this.findTrainingByPlan(p));
        });
    }

    /**
     * Erzeugt ein MenuItem fuer einen Plan
     * @param plansWithoutTraining alle Plaene ohne Training
     */
    renderCreateTrainingWithPlan(plansWithoutTraining: PlanState) {
        return _.map(plansWithoutTraining, plan => {
            return <MenuItem onClick={event => this.createTraining(event, plan)} eventKey={plan.id} key={plan.id}>
                {plan.name}
            </MenuItem>
        });
    }

    /**
     * DropDown zum Erzeugen eines Trainings fuer einen Plan
     * @param plans Die TrainingsPlaene
     * @returns Die Komponente zum Erzeugen eines Trainings (DropDown)
     */
    renderCreateTrainingForPlan(plans: PlanState) {
        const plansWithoutTraining: Plan[] = this.findPlansWithoutTraining(plans);

        if (plansWithoutTraining && plansWithoutTraining.length > 0) {
            return <div>
                <SplitButton bsStyle='primary' title='Create Training' key='create-training' id='create-training'>
                    {this.renderCreateTrainingWithPlan(plansWithoutTraining)}
                </SplitButton>
            </div>
        }
        return null;
    }


    render() {
        return (<div>
            <ListGroup>
                {this.renderTrainings(this.props.trainings.trainings)}
            </ListGroup>
            {this.renderCreateTrainingForPlan(this.props.plans)}
        </div>)
    }

    createTraining(event, plan: Plan) {
        if (event) {
            event.preventDefault();
            this.props.createTraining(plan);
            this.props.history.push("/");
        }
    }

    startTraining(event, training: Training) {
        if (event) {
            event.preventDefault();
            const now = new Date();
            console.log('now: ', toDateString(now));
            this.props.startTraining(training);
            this.props.history.push(`/trainings/${training.id}`);
        }
    }

    continueTraining(event, training: Training) {
        if (event) {
            event.preventDefault();
            console.log('continue training: ', training);
        }
    }
}

function mapStateToProps(state: State) {
    return {
        plans: state.plans,
        trainings: state.training
    }
}

export default withRouter(connect(mapStateToProps, {
    fetchPlans,
    fetchTrainings,
    startTraining,
    createTraining
})(TrainingList));