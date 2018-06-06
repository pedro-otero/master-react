import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Producers from './producers';

Enzyme.configure({ adapter: new Adapter() });

describe('Producers component', () => {
  it('renders the JointList component', () => {
    const wrapper = shallow(<Producers list={['1']} />);
    expect(wrapper.find('JointList').length).toEqual(1);
  });
});
