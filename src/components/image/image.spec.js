import React from 'react';
import { shallow } from 'enzyme';

import Image from './image';

describe('Image', () => {
  it('sets size', () => {
    const wrapper = shallow(<Image
        src="img.jpg"
        size="6em" />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('renders rounded', () => {
    const wrapper = shallow(<Image
        rounded
        src="img.jpg"
        size="6em" />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('sets xs breakpoint size', () => {
    const wrapper = shallow(<Image
        src="img.jpg"
        xs="6em" />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('sets sm breakpoint size', () => {
    const wrapper = shallow(<Image
        src="img.jpg"
        sm="6em" />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('sets md breakpoint size', () => {
    const wrapper = shallow(<Image
        src="img.jpg"
        md="6em" />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('sets lg breakpoint size', () => {
    const wrapper = shallow(<Image
        src="img.jpg"
        lg="6em" />);
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('sets xl breakpoint size', () => {
    const wrapper = shallow(<Image
        src="img.jpg"
        xl="6em" />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});
