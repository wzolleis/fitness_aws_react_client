import {planReducer} from '../PlanReducer';
import type {Plan} from "../../types/index";
import _ from 'lodash';

describe('PlanReducer', () => {
    it('handles unknown actions', () => {
        expect(planReducer(undefined, {})).toMatchObject({});
    });

    describe('handles plan actions', () => {
        let plans: Plan[] = [];

        beforeEach(() => {
            for (let i = 0; i < 5; i++) {
                const plan = {
                    id: i.toString(),
                    name: 'test_plan_' + i.toString(),
                    exercises: [(i + 100).toString()]
                };
                plans.push(plan);
            }
        });

        it('FETCH_PLAN', () => {
            const singlePlan = plans[0];

            const action = {
                type: 'FETCH_PLAN',
                payload: singlePlan
            };

            const expectedValue = {
                [singlePlan.id]: singlePlan
            };

            expect(planReducer({}, action)).toEqual(expectedValue);
        });

        it('FETCH_PLANS', () => {
            const action = {
                type: 'FETCH_PLANS',
                payload: plans
            };

            const expectedValue = _.mapKeys(plans, 'id');
            expect(planReducer({}, action)).toEqual(expectedValue);

        })
    });


});