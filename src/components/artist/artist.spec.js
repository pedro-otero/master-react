import React from 'react';
import { shallow } from 'enzyme';

import Connected, { Artist } from './artist';

describe('Artist component', () => {
  describe('Isolated', () => {
    it('renders empty OK', () => {
      shallow(<Artist
          albums={[]}
          clearErrors={() => {}}
          viewArtist={() => {}}
          loadArtistAlbums={() => {}} />);
    });

    it('renders banner', () => {
      const wrapper = shallow(<Artist
          name="Someone"
          albums={[]}
          clearErrors={() => {}}
          viewArtist={() => {}}
          loadArtistAlbums={() => {}} />);

      expect(wrapper.find('ArtistWork').length).toEqual(1);
    });

    it('renders albums', () => {
      const albums = [{ name: 'Albums', items: [{ id: 'AL1' }] }];

      const wrapper = shallow(<Artist
          name="Someone"
          albums={albums}
          clearErrors={() => {}}
          viewArtist={() => {}}
          loadArtistAlbums={() => {}} />);

      expect(wrapper.find('AlbumItem').length).toEqual(1);
    });

    it('does not render albums', () => {
      const wrapper = shallow(<Artist
          name="Someone"
          albums={[]}
          clearErrors={() => {}}
          viewArtist={() => {}}
          loadArtistAlbums={() => {}} />);

      expect(wrapper.find('Block').render().text()).toEqual('');
    });

    it('clears errors', () => {
      const clearErrors = jest.fn();

      shallow(<Artist
          id="R1"
          albums={[]}
          clearErrors={clearErrors}
          viewArtist={() => {}}
          loadArtistAlbums={() => {}} />);

      expect(clearErrors).toHaveBeenCalled();
    });

    it('views artist', () => {
      const viewArtist = jest.fn();

      shallow(<Artist
          id="R1"
          albums={[]}
          clearErrors={() => {}}
          viewArtist={viewArtist}
          loadArtistAlbums={() => {}} />);

      expect(viewArtist).toHaveBeenCalledWith('R1');
    });

    it('starts loading artist albums', () => {
      const loadArtistAlbums = jest.fn();

      shallow(<Artist
          id="R1"
          albums={[]}
          clearErrors={() => {}}
          viewArtist={() => {}}
          loadArtistAlbums={loadArtistAlbums} />);

      expect(loadArtistAlbums).toHaveBeenCalledWith('R1');
    });

    it('continues loading artist albums', () => {
      const loadArtistAlbums = jest.fn();
      const wrapper = shallow(<Artist
          id="R1"
          albums={[]}
          clearErrors={() => {}}
          viewArtist={() => {}}
          loadArtistAlbums={loadArtistAlbums} />);
      loadArtistAlbums.mockReset();

      wrapper.setProps({ next: 20 });

      expect(loadArtistAlbums).toHaveBeenCalledWith('R1');
    });

    it('stops loading artist albums', () => {
      const loadArtistAlbums = jest.fn();
      const wrapper = shallow(<Artist
          id="R1"
          albums={[]}
          clearErrors={() => {}}
          viewArtist={() => {}}
          loadArtistAlbums={loadArtistAlbums} />);
      wrapper.setProps({ next: 20 });
      loadArtistAlbums.mockReset();

      wrapper.setProps({ next: null });

      expect(loadArtistAlbums).not.toHaveBeenCalled();
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
