import React from 'react';
import { shallow } from 'enzyme';

import Welcome from './welcome';

describe('Welcome component', () => {
  it('renders', () => {
    const wrapper = shallow(<Welcome />);
    expect(wrapper.find('Main')).toHaveLength(1);
  });
});
