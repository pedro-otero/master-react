import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Composers from './composers';

Enzyme.configure({ adapter: new Adapter() });

describe('Composers component', () => {
  it('renders the JointList component', () => {
    const wrapper = shallow(<Composers list={['1']} />);
    expect(wrapper.find('JointList').length).toEqual(1);
  });
});
