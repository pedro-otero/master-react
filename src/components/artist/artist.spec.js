import React from 'react';
import { shallow } from 'enzyme';

import Connected, { Artist } from './artist';

describe('Artist component', () => {
  describe('Isolated', () => {
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

  describe('Connected', () => {
    it('finds data', () => {
      const store = {
        getState: () => ({
          artists: { R1: { name: 'Artist' } },
        }),
        subscribe: () => {},
      };

      const wrapper = shallow(<Connected id="R1" store={store} />);

      expect(wrapper.find('Artist[name="Artist"]').exists()).toEqual(true);
    });

    it('renders without data', () => {
      const store = {
        getState: () => ({
          artists: {},
        }),
        subscribe: () => {},
      };

      const wrapper = shallow(<Connected id="R1" store={store} />);

      expect(wrapper.find('Artist').prop('name')).toEqual(undefined);
    });
  });
});
