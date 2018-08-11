import React from 'react';
import { shallow } from 'enzyme';

import { Home } from './home';

describe('Home component', () => {
  it('renders LoadingCircle when loading=true', () => {
    const wrapper = shallow(<Home loading={true} />);
    expect(wrapper.find('LoadingCircle')).toHaveLength(1);
  });

  it('renders first name when loading=false', () => {
    const wrapper = shallow(<Home name="First Last" />);
    expect(wrapper.find('h1').text()).toEqual('Hey First');
  });
});
