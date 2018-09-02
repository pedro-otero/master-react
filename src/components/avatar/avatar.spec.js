import React from 'react';
import { shallow } from 'enzyme';

import Avatar from './avatar';

describe('Avatar', () => {
  it('renders div', () => {
    const wrapper = shallow(<Avatar
        src='img.jpg'
        size='2em' />).dive();
    expect(wrapper.find('div').length).toEqual(1);
  });
});
