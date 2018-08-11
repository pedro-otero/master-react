import React from 'react';
import { shallow } from 'enzyme';

import Composers from './composers';

describe('Composers component', () => {
  it('renders the JointList component', () => {
    const wrapper = shallow(<Composers list={['1']} />);
    expect(wrapper.find('JointList').length).toEqual(1);
  });
});
