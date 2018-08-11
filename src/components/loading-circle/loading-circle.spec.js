import React from 'react';
import { shallow } from 'enzyme';

import LoadingCircle from './loading-circle';

describe('Loading circle component', () => {
  it('displays passed message', () => {
    const wrapper = shallow(<LoadingCircle message="something" />);
    expect(wrapper.find('h1').text()).toEqual('something');
  });
});
