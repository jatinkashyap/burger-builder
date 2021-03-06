import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter : new Adapter()});

describe('<NavigationItems/>',() => {
    /* beforeEach(() => {

    }) */

    it('should render two <NavigationItem/> elemets if not authenticated',() => {
        const wrapper = shallow(<NavigationItems/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem/> elemets if authenticated',() => {
        const wrapper = shallow(<NavigationItems isLoggedIn/>);
        //wrapper.setProps({isLoggedIn : true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should contain NavigationItem link="/logout">Logout</NavigationItem> if authenticated',() => {
        const wrapper = shallow(<NavigationItems isLoggedIn/>);
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toBe(true);
    });
});