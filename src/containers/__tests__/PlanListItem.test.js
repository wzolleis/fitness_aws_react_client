// @flow
import React from 'react';
import {shallow} from "enzyme";
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import PlanListItem from '../PlanListItem';
import type {PlanListItemProps} from "../PlanListItem";

describe('PlanListItem', () => {

    beforeAll(() => {
        Enzyme.configure({adapter: new Adapter()});
    })

    function setup() {
        const props: PlanListItemProps = {};

        const component = shallow(<PlanListItem {...props} />)

        return {
            props,
            component
        }
    };

    beforeEach(() => {


    });

    it('item is displayed', () => {
        const {component} = setup();
    })
})
