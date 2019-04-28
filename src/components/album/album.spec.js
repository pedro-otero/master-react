import React from 'react';
import { shallow } from 'enzyme';

import { Album } from './album';

describe('Album component', () => {
  it('renders empty OK', () => {
    shallow(<Album />);
  });

  it('renders banner', () => {
    const wrapper = shallow(<Album
        artist="Someone"
        name="album" />);
    expect(wrapper.find('ArtistWork').length).toEqual(1);
  });

  it('renders tracks', () => {
    const wrapper = shallow(<Album
        artist="Someone"
        name="album"
        tracks={[{}, {}, {}]} />);
    expect(wrapper.find('li').length).toEqual(3);
  });

  it('hides Progress', () => {
    const wrapper = shallow(<Album
        artist="Someone"
        name="album" />);
    expect(wrapper.find('Progress').length).toEqual(0);
  });
});
