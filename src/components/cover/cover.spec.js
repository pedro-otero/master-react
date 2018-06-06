import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Cover from './cover';

Enzyme.configure({ adapter: new Adapter() });

describe('Cover', () => {
  it('displays album cover', () => {
    const wrapper = shallow(<Cover album={{ images: [{ url: 'img.jpg' }], release_date: '2004' }} />);
    expect(wrapper.find('div[className="image"]').length).toEqual(1);
  });

  it('displays album cover with applied class for image', () => {
    const wrapper = shallow(<Cover
        album={{ images: [{ url: 'img.jpg' }], release_date: '2004' }}
        imageClass="someClass" />);
    expect(wrapper.find('div[className="image someClass"]').length).toEqual(1);
  });

  it('displays year', () => {
    const wrapper = shallow(<Cover album={{ images: [{ url: 'img.jpg' }], release_date: '2004' }} />);
    expect(wrapper.find('span[className="year"]').length).toEqual(1);
  });

  it('displays year with applied class for year label', () => {
    const wrapper = shallow(<Cover
        album={{ images: [{ url: 'img.jpg' }], release_date: '2004' }}
        yearClass="someClass" />);
    expect(wrapper.find('span[className="year someClass"]').length).toEqual(1);
  });
});
