import React from 'react';
import { shallow } from 'enzyme';

import { SavedAlbums, mapStateToProps } from './saved-albums';

describe('Saved albums', () => {
  describe('Component', () => {
    it('fetches albums on load', () => {
      const mock = jest.fn();
      shallow(<SavedAlbums loadSavedAlbums={mock} albums={[]} />);
      expect(mock).toBeCalled();
    });
  });

  describe('mapStateToProps', () => {
    it('gets all the data for an album', () => {
      const state = {
        user: {
          library: {
            albums: {
              items: {
                L1: {
                  id: 'L1', name: 'Album', artist: 'Artist',
                },
              },
              nextPage: { offset: 80, limit: 20 },
            },
          },
        },
      };
      const props = mapStateToProps(state);
      expect(props).toEqual({
        albums: [{
          id: 'L1',
          name: 'Album',
          artist: 'Artist',
        }],
        canLoadMore: true,
      });
    });
  });
});
