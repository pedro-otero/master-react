import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Banner from './banner';

Enzyme.configure({ adapter: new Adapter() });

describe('Banner component', () => {
  it('renders ok empty', () => {
    shallow(<Banner src="..."></Banner>);
  });

  it('renders the main container', () => {
    const wrapper = shallow(<Banner src="..."></Banner>);
    expect(wrapper.find('div[className="banner-main"]').length).toEqual(1);
  });

  it('renders the content', () => {
    const wrapper = shallow(<Banner src="..."></Banner>);
    expect(wrapper.find('div[className="banner-content"]').length).toEqual(2);
  });

  it('renders the content with an additional class', () => {
    const wrapper = shallow(<Banner
        src="..."
        className="someClass"></Banner>);
    expect(wrapper.find('div[className="banner-content someClass"]').length).toEqual(1);
  });
});
