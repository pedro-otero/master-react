import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Cover from './cover';

Enzyme.configure({ adapter: new Adapter() });

describe('Cover', () => {
  it('displays year', () => {
    const wrapper = shallow(<Cover
        src='img.jpg'
        year='2004' />);
    expect(wrapper.find('span').text()).toEqual('2004');
  });

  it('displays year with applied class for year label', () => {
    const wrapper = shallow(<Cover
        src='img.jpg'
        year='2004'
        yearClass="someClass" />);
    expect(wrapper.find('span[className="someClass"]').length).toEqual(1);
  });
});
