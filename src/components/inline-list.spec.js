import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import InlineList from './inline-list';

Enzyme.configure({ adapter: new Adapter() });

describe('Inline List', () => {
  it('renders list of values', () => {
    const wrapper = shallow(<InlineList values={['one', 'two', 'three']} />);
    expect(wrapper.find('span[className="main"]').text()).toEqual('one, two, three');
  });
});
