import React from 'react';
import { shallow } from 'enzyme';

import Cover from './cover';

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
    expect(wrapper.find('span[className="year someClass"]').length).toEqual(1);
  });
});
