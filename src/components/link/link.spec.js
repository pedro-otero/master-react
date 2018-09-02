import React from 'react';
import { shallow } from 'enzyme';

import Link from './link';

describe('Link component', () => {
  it('passes through props to react router Link', () => {
    const wrapper = shallow(<Link to="somewhere" />).dive();
    expect(wrapper.find('Link[to="somewhere"]').length).toEqual(1);
  });
});
