import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import JointList from './joint-list';

Enzyme.configure({ adapter: new Adapter() });

describe('Inline List', () => {
  it('renders list of values', () => {
    const wrapper = shallow(<JointList values={['one', 'two', 'three']} />);
    expect(wrapper.find('span[className="main"]').text()).toEqual('one, two, three');
  });

  it('starts list of values with a passed prop', () => {
    const wrapper = shallow(<JointList
        values={['one', 'two', 'three']}
        start="this is the list: " />);
    expect(wrapper.find('span[className="main"]').text()).toEqual('this is the list: one, two, three');
  });

  it('ends list of values with a passed prop', () => {
    const wrapper = shallow(<JointList
        values={['one', 'two', 'three']}
        end="." />);
    expect(wrapper.find('span[className="main"]').text()).toEqual('one, two, three.');
  });
});
