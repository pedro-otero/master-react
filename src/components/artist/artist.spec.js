import React from 'react';
import { shallow } from 'enzyme';

import { Artist } from './artist';

describe('Artist component', () => {
  it('renders empty OK', () => {
    shallow(<Artist viewArtist={() => {}} />);
  });

  it('renders banner', () => {
    const wrapper = shallow(<Artist
        name="Someone"
        viewArtist={() => {}} />);

    expect(wrapper.find('ArtistWork').length).toEqual(1);
  });

  it('renders albums', () => {
    const wrapper = shallow(<Artist
        name="Someone"
        albums={[{ id: 'AL1' }]}
        viewArtist={() => {}} />);

    expect(wrapper.find('AlbumItem').length).toEqual(1);
  });

  it('renders LoadingCircle', () => {
    const wrapper = shallow(<Artist
        loading={true}
        viewArtist={() => {}} />);

    expect(wrapper.find('LoadingCircle').length).toEqual(1);
  });

  it('renders error message', () => {
    const wrapper = shallow(<Artist
        failed={true}
        viewArtist={() => {}} />);

    expect(wrapper.find('h1').text()).toEqual('Could not load this artist');
  });
});
