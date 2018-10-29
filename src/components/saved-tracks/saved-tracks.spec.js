import React from 'react';
import { shallow } from 'enzyme';

import { SavedTracks, mapStateToProps } from './saved-tracks';

describe('Saved tracks', () => {
  describe('Component', () => {
    it('fetches tracks on load', () => {
      const mock = jest.fn();
      shallow(<SavedTracks loadSavedTracks={mock} tracks={[]} />);
      expect(mock).toBeCalled();
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
            },
          },
        },
      };
      const props = mapStateToProps(state);
      expect(props).toEqual({
        tracks: [{
          id: 'T1',
          name: 'Track',
          artist: 'Artist',
          album: 'Album',
        }],
      });
    });
  });
});
