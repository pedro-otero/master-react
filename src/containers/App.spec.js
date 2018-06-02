import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Rx from 'rxjs';

import { App } from './App';

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
    const setSearchResult = jest.fn();
    const setAlbum = jest.fn();
    const setArtist = jest.fn();

    let wrapper;
    beforeAll(() => {
      wrapper = shallow(<App
          setSearchResult={setSearchResult}
          setAlbum={setAlbum}
          setArtist={setArtist}
          searches={[]}
          albums={{ AL1: { id: 'AL1', value: 'expected' } }}
          artists={{ AR1: { id: 'AR1', value: 'expected' } }}
          spotifyApi={mockApi}
          backend={backend} />);
    });

    it('Calls #getCurrentPlayback on mount', () => {
      expect(mockApi.getCurrentPlayback.mock.calls.length).toBe(1);
    });

    it('hides EmptyPlayback component', () => {
      expect(wrapper.update().find('EmptyPlayback').length).toBe(0);
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

    it('displays Song', () => {
      expect(wrapper.update().find('Song').length).toEqual(1);
    });

    it('selects correct album', () => {
      expect(wrapper.instance().selectAlbum().value).toEqual('expected');
    });

    it('selects correct artist', () => {
      expect(wrapper.instance().selectArtist().value).toEqual('expected');
    });

    it('unsubscribes from credits observable', () => {
      wrapper.unmount();
      expect(unsubscribe.mock.calls.length).toEqual(1);
    });
  });

  describe('finds NO playback data', () => {
    const mockApi = {
      getCurrentPlayback: jest.fn(() => Promise.resolve({
        body: null,
      })),
      getArtist: jest.fn(),
      getAlbum: jest.fn(),
    };
    const backend = {
      getCredits: jest.fn(),
    };

    let wrapper;
    let errorsSpy;
    beforeAll(() => {
      wrapper = shallow(<App
          spotifyApi={mockApi}
          backend={backend} />);
      errorsSpy = jest.spyOn(App.prototype, 'addError');
    });

    it('Calls #getCurrentPlayback on mount', () => {
      expect(mockApi.getCurrentPlayback.mock.calls.length).toBe(1);
    });

    it('displays EmptyPlayback component', () => {
      expect(wrapper.update().find('EmptyPlayback').length).toBe(1);
    });

    it('hides errors', () => {
      expect(wrapper.update().find('div[className="errors-div"]').length).toBe(0);
    });

    it('does not add errors', () => {
      expect(errorsSpy).not.toHaveBeenCalled();
    });

    it('hides Song', () => {
      expect(wrapper.update().find('Song').length).toEqual(0);
    });

    it('does NOT get album', () => {
      expect(mockApi.getAlbum).not.toHaveBeenCalled();
    });

    it('does NOT get artist', () => {
      expect(mockApi.getArtist).not.toHaveBeenCalled();
    });

    it('does NOT get credits', () => {
      expect(backend.getCredits).not.toHaveBeenCalled();
    });
  });
});
