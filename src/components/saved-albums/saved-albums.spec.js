import React from 'react';
import { shallow } from 'enzyme';

import { SavedAlbums, mapStateToProps } from './saved-albums';

describe('Saved albums', () => {
  describe('Component', () => {
    it('fetches albums on mount', () => {
      const loadSavedAlbums = jest.fn();
      shallow(<SavedAlbums
          loadSavedAlbums={loadSavedAlbums}
          clearErrors={() => {}}
          albums={[]} />);

      expect(loadSavedAlbums).toBeCalled();
    });

    it('clears errors on mount', () => {
      const clearErrors = jest.fn();
      shallow(<SavedAlbums
          loadSavedAlbums={() => {}}
          clearErrors={clearErrors}
          albums={[]} />);

      expect(clearErrors).toBeCalled();
    });

    it('loads more albums if there are', () => {
      const loadSavedAlbums = jest.fn();
      const wrapper = shallow(<SavedAlbums
          loadSavedAlbums={loadSavedAlbums}
          clearErrors={() => {}}
          nextPage={{}}
          albums={[]} />);
      loadSavedAlbums.mockReset();

      wrapper.setProps({
        nextPage: { offset: 10 },
      });

      expect(loadSavedAlbums).toBeCalled();
    });

    it('renders albums', () => {
      const wrapper = shallow(<SavedAlbums
          loadSavedAlbums={() => {}}
          clearErrors={() => {}}
          albums={[{
          id: 'T1',
          name: 'Album',
          artist: 'Artist',
        }]} />);

      expect(wrapper.find('SavedAlbumItem')).toHaveLength(1);
    });

    it('renders no results sign', () => {
      const wrapper = shallow(<SavedAlbums
          loadSavedAlbums={() => {}}
          clearErrors={() => {}}
          albums={[]} />);

      expect(wrapper.find('NoItems')).toHaveLength(1);
    });
  });

  describe('mapStateToProps', () => {
    it('gets all the data for a album', () => {
      const state = {
        user: {
          library: {
            albums: {
              items: {
                T1: {
                  id: 'T1', name: 'Album', artist: 'Artist',
                },
              },
              nextPage: { offset: 80, limit: 20 },
            },
          },
        },
        search: { value: '' },
      };
      const props = mapStateToProps(state);
      expect(props).toEqual({
        albums: [{
          id: 'T1',
          name: 'Album',
          artist: 'Artist',
        }],
        nextPage: { offset: 80, limit: 20 },
      });
    });

    it('filters albums', () => {
      const state = {
        user: {
          library: {
            albums: {
              items: {
                T1: {
                  id: 'T1', name: 'tErM', artist: 'Artist',
                },
                T2: {
                  id: 'T2', name: 'Track', artist: 'term',
                },
                T4: {
                  id: 'T4', name: 'this', artist: 'does not match',
                },
              },
              nextPage: { offset: 80, limit: 20 },
            },
          },
        },
        search: { value: 'term' },
      };
      const props = mapStateToProps(state);
      expect(props).toEqual({
        albums: [{
          id: 'T1',
          name: 'tErM',
          artist: 'Artist',
        }, {
          id: 'T2',
          name: 'Track',
          artist: 'term',
        }],
        nextPage: { offset: 80, limit: 20 },
      });
    });
  });
});
