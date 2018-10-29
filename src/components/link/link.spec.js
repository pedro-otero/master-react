import React from 'react';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import Link from './link';

describe('Link component', () => {
  it('passes through props to react router Link', () => {
    const wrapper = shallow(<MemoryRouter initialEntries={['/']}>
      <Link to="somewhere" className="anotherClass" />
    </MemoryRouter>).dive().dive();
    expect(wrapper.find('.anotherClass').length).toEqual(1);
  });
});
