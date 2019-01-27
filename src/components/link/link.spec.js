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

  it('renders a Link', () => {
    const wrapper = shallow(<MemoryRouter initialEntries={['/']}>
      <Link to="somewhere" className="anotherClass" />
    </MemoryRouter>).dive().dive().dive();

    expect(wrapper.find('Link').length).toEqual(1);
  });

  it('does not render Link if it is not necessary (no path)', () => {
    const wrapper = shallow(<MemoryRouter initialEntries={['/']}>
      <Link className="anotherClass">
        <h4>A link</h4>
      </Link>
    </MemoryRouter>).dive().dive();

    expect(wrapper.find('Link').length).toEqual(0);
  });
});
