import React from 'react';
import { shallow } from 'enzyme';

import NoItems from './no-items';

describe('No Items component', () => {
  it('renders', () => {
    const wrapper = shallow(<NoItems />);
    expect(wrapper.exists()).toEqual(true);
  });
});
