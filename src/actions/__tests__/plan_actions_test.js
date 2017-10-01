jest.mock('../..//libs/awsLib');
import {fetchPlan} from '../PlanActions';

describe('actions', () => {

    describe('fetch plan', () => {
        it('has the correct type', async () => {
            expect(fetchPlan('1234').type).toEqual('FETCH_PLAN');
        });

        it('has the correct payload', async () => {
            const action = fetchPlan('1234');
            const expected = {

                id: '1',
                name: 'test',
                exercises: []

            };
            expect(action.payload).resolves.toEqual(expected);
        })
    })
});
