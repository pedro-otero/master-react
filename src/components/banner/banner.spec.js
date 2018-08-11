import React from 'react';
import { shallow } from 'enzyme';

import Banner from './banner';

describe('Banner component', () => {
  it('renders ok empty', () => {
    shallow(<Banner src="..."></Banner>);
  });

  it('renders the content with an additional class', () => {
    const wrapper = shallow(<Banner
        src="..."
        className="someClass"></Banner>);
    expect(wrapper.find('div[className="content someClass"]').length).toEqual(1);
  });
});
