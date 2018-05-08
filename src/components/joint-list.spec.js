import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import JointList from './joint-list';

Enzyme.configure({ adapter: new Adapter() });

describe('Inline List', () => {
  it('renders list of values with className', () => {
    const wrapper = shallow(<JointList
        values={['one', 'two', 'three']}
        className="main" />);
    expect(wrapper.find('span[className="main"]').text()).toEqual('one, two, three');
  });

  it('renders nothing when passed empty list of values', () => {
    const wrapper = shallow(<JointList
        values={[]}
        className="main" />);
    expect(wrapper.find('span[className="main"]').length).toEqual(0);
  });

  it('starts list of values with a passed prop', () => {
    const wrapper = shallow(<JointList
        values={['one', 'two', 'three']}
        start="this is the list: " />);
    expect(wrapper.find('span').text()).toEqual('this is the list: one, two, three');
  });

  it('ends list of values with a passed prop', () => {
    const wrapper = shallow(<JointList
        values={['one', 'two', 'three']}
        end="." />);
    expect(wrapper.find('span').text()).toEqual('one, two, three.');
  });
});
