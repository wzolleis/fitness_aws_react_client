// @flow weak
import type {Plan, PlanState, Training, Trainings} from "../types/index";
import moment from "moment";
import {parseDateString} from "./DateUtils";
import _ from 'lodash';

export const doesTrainingExist = (training: Training) => {
    return training !== undefined;
};

export const isTrainingStarted = (training: Training) => {
    if (training && training.createdAt) {
        const now: Date = new Date();
        const trainingStart: Date = parseDateString(training.createdAt);
        return moment(now).isAfter(trainingStart);
    }
    return false;
};

export const isTrainingFinished = (training: Training) => {
    return (training && training.finishedAt);
};

/**
 * Suche nach Plaenen, die keinen Eintrag in den Trainings besitzen
 * @param plans Die Plaene
 * @return Die Plaene, die kein Training besitzten
 */
export const findPlansWithoutTraining = (plans: PlanState, trainings: Trainings) => {
    const planList: Plan[] = _.values(plans);
    return _.filter(planList, p => {
        return !doesTrainingExist(findTrainingByPlan(p, trainings));
    });
};

export const findTrainingByPlan = (plan: Plan, trainings: Trainings) => {
    // Objekt mit den plan-ids als key und den trainings als value
    const trainingByPlan = _.mapKeys(trainings, 'plan');
    return trainingByPlan[plan.id];
};
