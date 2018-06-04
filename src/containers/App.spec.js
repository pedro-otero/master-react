import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Rx from 'rxjs';

import { App } from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App container', () => {
  describe('gets all playback data', () => {
    const playbackInfo = {
      item: {
        id: 'T1',
        artists: [{ id: 'AR1' }],
        album: {
          id: 'AL1',
          images: [{}],
        },
      },
    };
    const loadPlaybackInfo = jest.fn(() => Promise.resolve({
      body: playbackInfo,
    }));
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

    let wrapper;
    beforeAll(() => {
      wrapper = shallow(<App
          loadPlaybackInfo={loadPlaybackInfo}
          setSearchResult={setSearchResult}
          searches={{}}
          playbackInfo={playbackInfo}
          albums={{ AL1: { id: 'AL1', value: 'expected' } }}
          artists={{ AR1: { id: 'AR1', value: 'expected' } }}
          backend={backend} />);
    });

    it('Calls loadPlaybackInfo on mount', () => {
      expect(loadPlaybackInfo.mock.calls.length).toBe(1);
    });

    it('hides EmptyPlayback component', () => {
      expect(wrapper.find('EmptyPlayback').length).toBe(0);
    });

    it('gets credits', () => {
      expect(backend.getCredits.mock.calls).toEqual([['AL1']]);
    });

    it.skip('displays TrackDetails', () => {
      expect(wrapper.find('TrackDetails').length).toEqual(1);
    });

    it('unsubscribes from credits observable', () => {
      wrapper.unmount();
      expect(unsubscribe.mock.calls.length).toEqual(1);
    });
  });

  describe('finds NO playback data', () => {
    const loadPlaybackInfo = jest.fn(() => Promise.resolve({
      body: null,
    }));
    const backend = {
      getCredits: jest.fn(),
    };

    let wrapper;
    let errorsSpy;
    beforeAll(() => {
      wrapper = shallow(<App
          loadPlaybackInfo={loadPlaybackInfo}
          searches={{}}
          setSearchResult={jest.fn()}
          backend={backend} />);
      errorsSpy = jest.spyOn(App.prototype, 'addError');
    });

    it('Calls #getCurrentPlayback on mount', () => {
      expect(loadPlaybackInfo.mock.calls.length).toBe(1);
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

    it('hides TrackDetails', () => {
      expect(wrapper.update().find('TrackDetails').length).toEqual(0);
    });

    it('does NOT get credits', () => {
      expect(backend.getCredits).not.toHaveBeenCalled();
    });
  });
});
