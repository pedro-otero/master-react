import React from 'react';
import { shallow } from 'enzyme';

import { SavedTracks, mapStateToProps } from './saved-tracks';

describe('Saved tracks', () => {
  describe('Component', () => {
    it('fetches tracks on mount', () => {
      const loadSavedTracks = jest.fn();
      shallow(<SavedTracks
          loadSavedTracks={loadSavedTracks}
          clearErrors={() => {}}
          tracks={[]} />);

      expect(loadSavedTracks).toBeCalled();
    });

    it('clears errors on mount', () => {
      const clearErrors = jest.fn();
      shallow(<SavedTracks
          loadSavedTracks={() => {}}
          clearErrors={clearErrors}
          tracks={[]} />);

      expect(clearErrors).toBeCalled();
    });

    it('loads more tracks if there are', () => {
      const loadSavedTracks = jest.fn();
      const wrapper = shallow(<SavedTracks
          loadSavedTracks={loadSavedTracks}
          clearErrors={() => {}}
          nextPage={{}}
          tracks={[]} />);
      loadSavedTracks.mockReset();

      wrapper.setProps({
        nextPage: { offset: 10 },
      });

      expect(loadSavedTracks).toBeCalled();
    });

    it('renders tracks', () => {
      const wrapper = shallow(<SavedTracks
          loadSavedTracks={() => {}}
          clearErrors={() => {}}
          tracks={[{
            id: 'T1',
            name: 'Track',
            artist: 'Artist',
            album: 'Album',
          }]} />);

      expect(wrapper.find('SavedTrackItem')).toHaveLength(1);
    });

    it('renders no results sign', () => {
      const wrapper = shallow(<SavedTracks
          loadSavedTracks={() => {}}
          clearErrors={() => {}}
          tracks={[]} />);

      expect(wrapper.find('NoItems')).toHaveLength(1);
    });
  });

  describe('mapStateToProps', () => {
    it('gets all the data for a track', () => {
      const state = {
        user: {
          library: {
            tracks: {
              items: {
                T1: {
                  id: 'T1', name: 'Track', artist: 'Artist', album: 'Album',
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
        tracks: [{
          id: 'T1',
          name: 'Track',
          artist: 'Artist',
          album: 'Album',
        }],
        nextPage: { offset: 80, limit: 20 },
      });
    });

    it('filters tracks', () => {
      const state = {
        user: {
          library: {
            tracks: {
              items: {
                T1: {
                  id: 'T1', name: 'tErM', artist: 'Artist', album: 'Album',
                },
                T2: {
                  id: 'T2', name: 'Track', artist: 'term', album: 'Album',
                },
                T3: {
                  id: 'T3', name: 'Track', artist: 'Artist', album: 'TERM',
                },
                T4: {
                  id: 'T4', name: 'this', artist: 'does not', album: 'match',
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
        tracks: [{
          id: 'T1',
          name: 'tErM',
          artist: 'Artist',
          album: 'Album',
        }, {
          id: 'T2',
          name: 'Track',
          artist: 'term',
          album: 'Album',
        }, {
          id: 'T3',
          name: 'Track',
          artist: 'Artist',
          album: 'TERM',
        }],
        nextPage: { offset: 80, limit: 20 },
      });
    });
  });
});
