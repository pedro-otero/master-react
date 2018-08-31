import React from 'react';
import { shallow } from 'enzyme';

import Album from './album';

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
        progress={50}
        tracks={[{}, {}, {}]} />);
    expect(wrapper.find('li').length).toEqual(3);
  });

  it('renders Progress', () => {
    const wrapper = shallow(<Album
        artist="Someone"
        name="album"
        progress={50} />);
    expect(wrapper.find('Progress').length).toEqual(1);
  });

  it('hides Progress', () => {
    const wrapper = shallow(<Album
        artist="Someone"
        name="album"
        progress={100} />);
    expect(wrapper.find('Progress').length).toEqual(0);
  });

  it('renders LoadingCircle', () => {
    const wrapper = shallow(<Album loading={true} />);
    expect(wrapper.find('LoadingCircle').length).toEqual(1);
  });

  it('renders error message', () => {
    const wrapper = shallow(<Album failed={true} />);
    expect(wrapper.find('h1').text()).toEqual('Could not load this album');
  });
});
