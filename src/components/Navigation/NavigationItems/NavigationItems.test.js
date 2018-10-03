import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter : new Adapter()});

describe('<NavigationItems/>',() => {jatinkashy
    beforeEach(() => {

    })

    it('should render two <NavigationItem/> elemets if not authenticated',() => {
        const wrapper = shallow(<NavigationItems/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render three <NavigationItem/> elemets if authenticated',() => {
        const wrapper = shallow(<NavigationItems isLoggedIn/>);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});