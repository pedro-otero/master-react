import React from 'react';
import { shallow } from 'enzyme';

import Connected, { Album } from './album';

describe('Album component', () => {
  describe('Isolated', () => {
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

    it('clears the album in view', () => {
      const clearAlbumInView = jest.fn();
      const wrapper = shallow(<Album
          artist="Someone"
          name="album"
          clearAlbumInView={clearAlbumInView} />);

      wrapper.unmount();

      expect(clearAlbumInView).toHaveBeenCalled();
    });

    describe('Connected', () => {
      it('finds data', () => {
        const store = {
          getState: () => ({
            albums: { L1: { artistId: 'R1', name: 'Album' } },
            artists: { R1: { name: 'Artist' } },
          }),
          subscribe: () => {},
        };

        const wrapper = shallow(<Connected albumId="L1" store={store} />);

        expect(wrapper.find('Album[name="Album"][artist="Artist"]').exists()).toEqual(true);
      });

      it('renders without data', () => {
        const store = {
          getState: () => ({
            albums: {},
            artists: {},
          }),
          subscribe: () => {},
        };

        const wrapper = shallow(<Connected albumId="L1" store={store} />);

        expect(wrapper.find('Album').prop('name')).toEqual(undefined);
      });
    });
  });
});
