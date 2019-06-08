import React from 'react';
import { shallow } from 'enzyme';

import { Artist } from './artist';

describe('Artist component', () => {
  it('renders empty OK', () => {
    shallow(<Artist viewArtist={() => {}} albums={[]} />);
  });

  it('renders banner', () => {
    const wrapper = shallow(<Artist
        name="Someone"
        albums={[]}
        viewArtist={() => {}} />);

    expect(wrapper.find('ArtistWork').length).toEqual(1);
  });

  it('renders albums', () => {
    const albums = [{ name: 'Albums', items: [{ id: 'AL1' }] }];

    const wrapper = shallow(<Artist
        name="Someone"
        albums={albums}
        viewArtist={() => {}} />);

    expect(wrapper.find('AlbumItem').length).toEqual(1);
  });

  it('does not render albums', () => {
    const wrapper = shallow(<Artist
        name="Someone"
        albums={[]}
        viewArtist={() => {}} />);

    expect(wrapper.find('Block').render().text()).toEqual('');
  });
});
