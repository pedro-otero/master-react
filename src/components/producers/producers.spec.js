import React from 'react';
import { shallow } from 'enzyme';

import Producers from './producers';

describe('Producers component', () => {
  it('renders the JointList component', () => {
    const wrapper = shallow(<Producers list={['1']} />);
    expect(wrapper.find('JointList').length).toEqual(1);
  });
});
