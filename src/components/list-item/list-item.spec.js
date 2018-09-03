import React from 'react';
import { shallow } from 'enzyme';

import ListItem from './list-item';

describe('List Item', () => {
  it('renders', () => {
    const wrapper = shallow(<ListItem name="The name" additional="something else" />);
    expect(wrapper.exists()).toEqual(true);
  });
});
