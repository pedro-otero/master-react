import React from 'react';
import { shallow } from 'enzyme';

import ArtistWork from './artist-work';

describe('ArtistWork component', () => {
  it('has a Link to the work when a path is passed', () => {
    const wrapper = shallow(<ArtistWork path="to/somewhere" />);
    expect(wrapper.find('Link')).toHaveLength(1);
  });

  it('does not have a Link to the work when a path is not passed', () => {
    const wrapper = shallow(<ArtistWork />);
    expect(wrapper.find('Link')).toHaveLength(0);
  });
});
