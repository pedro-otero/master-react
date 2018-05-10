import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Rx from 'rxjs';

import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App container', () => {
  describe('gets all playback data', () => {
    const mockApi = {
      getCurrentPlayback: jest.fn(() => Promise.resolve({
        body: {
          item: {
            artists: [{ id: 'AR1' }],
            album: {
              id: 'AL1',
              images: [{}],
            },
          },
        },
      })),
      getArtist: jest.fn(() => Promise.resolve({ body: { id: 'AR1' } })),
      getAlbum: jest.fn(() => Promise.resolve({ body: { id: 'AL1' } })),
    };
    const unsubscribe = jest.fn();
    const observable = Rx.Observable.create((observer) => {
      observer.next({
        progress: 0,
        bestMatch: {
          tracks: [{
            composers: [],
            producers: [],
            credits: {},
          }],
        },
      });
      observer.complete();
      return unsubscribe;
    });
    const backend = {
      getCredits: jest.fn(() => observable),
    };

    const wrapper = shallow(<App
        spotifyApi={mockApi}
        backend={backend} />);

    it('Calls #getCurrentPlayback on mount', () => {
      expect(mockApi.getCurrentPlayback.mock.calls.length).toBe(1);
    });

    it('gets album', () => {
      expect(mockApi.getAlbum.mock.calls).toEqual([['AL1']]);
    });

    it('gets artist', () => {
      expect(mockApi.getArtist.mock.calls).toEqual([['AR1']]);
    });

    it('gets credits', () => {
      expect(backend.getCredits.mock.calls).toEqual([['AL1']]);
    });

    it('unsubscribes from credits observable', () => {
      wrapper.unmount();
      expect(unsubscribe.mock.calls.length).toEqual(1);
    });
  });
});
