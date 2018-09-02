import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Link from './link';

describe('Link component', () => {
  it('passes through props to react router Link', () => {
    const wrapper = shallow(<MemoryRouter initialEntries={['/']}>
      <Link to="somewhere" />
    </MemoryRouter>).dive();
    expect(wrapper.find('Link[to="somewhere"]').length).toEqual(1);
  });
});
