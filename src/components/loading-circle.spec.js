import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import LoadingCircle from './loading-circle';

Enzyme.configure({ adapter: new Adapter() });

describe('Loading circle component', () => {
  it('displays passed message', () => {
    const wrapper = shallow(<LoadingCircle message="something" />);
    expect(wrapper.find('h1').text()).toEqual('something');
  });
});
