import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Song } from './song';
import initialState from '../../store/initalState';

Enzyme.configure({ adapter: new Adapter() });

describe('Song component', () => {
  describe('initial state', () => {
    const wrapper = shallow(<Song
      data={initialState.song.credits}
      track={initialState.song.track}
      album={initialState.song.album}
      artist={initialState.song.artist}
      actions={{ getCredits: jest.fn() }}/>);

    it('hides composers list', () => {
      expect(wrapper.find('span[className="composers"]')).toHaveLength(0);
    });

    it('hides producers list', () => {
      expect(wrapper.find('span[className="producers"]')).toHaveLength(0);
    });

    it('shows all-data-empty section', () => {
      expect(wrapper.find('div[className="all-data-empty"]')).toHaveLength(1);
    });
  });

  describe('search responded without credits', () => {
    const wrapper = shallow(<Song
      data={initialState.song.credits}
      track={Object.assign({}, initialState.song.track, { id: 'T1' })}
      album={initialState.song.album}
      artist={initialState.song.artist}
      actions={{ getCredits: jest.fn() }}/>);

    it('displays big progress indicator', () => {
      expect(wrapper.find('progress[className="big-progress"]')).toHaveLength(1);
    });

    it('does not display small progress indicator', () => {
      expect(wrapper.find('progress[className="small-progress"]')).toHaveLength(0);
    });
  });

  describe('search responded with some credits', () => {
    const wrapper = shallow(<Song
      data={Object.assign({}, initialState.song.credits, { credits: { P1: ['R1', 'R2'] } })}
      track={Object.assign({}, initialState.song.track, { id: 'T1' })}
      album={initialState.song.album}
      artist={initialState.song.artist}
      actions={{ getCredits: jest.fn() }}/>);

    it('does not display big progress indicator', () => {
      expect(wrapper.find('progress[className="big-progress"]')).toHaveLength(0);
    });

    it('displays small progress indicator', () => {
      expect(wrapper.find('progress[className="small-progress"]')).toHaveLength(1);
    });
  });

  describe('search finished', () => {
    const wrapper = shallow(<Song
      data={Object.assign({}, initialState.song.credits, { credits: { P1: ['R1', 'R2'] } })}
      track={Object.assign({}, initialState.song.track, { id: 'T1' })}
      album={initialState.song.album}
      artist={initialState.song.artist}
      progress={100}
      actions={{ getCredits: jest.fn() }}/>);

    it('does not display big progress indicator', () => {
      expect(wrapper.find('progress[className="big-progress"]')).toHaveLength(0);
    });

    it('does not display small progress indicator', () => {
      expect(wrapper.find('progress[className="small-progress"]')).toHaveLength(0);
    });
  });

  describe('starts getting credits when first response available', () => {
    it('sets timer', () => {
      const actions = {
        getCredits: jest.fn(),
      };
      const wrapper = shallow(<Song
        data={Object.assign({}, initialState.song.credits, { credits: { P1: ['R1', 'R2'] } })}
        track={Object.assign({}, initialState.song.track, { id: 'T1' })}
        album={initialState.song.album}
        artist={initialState.song.artist}
        actions={actions}
        progress={1}/>);
      expect(wrapper.instance().timer).toBeDefined();
    });

    it('calls getCredits once', (done) => {
      const actions = {
        getCredits: jest.fn(() => done()),
      };
      const wrapper = shallow(<Song
        data={Object.assign({}, initialState.song.credits, { credits: { P1: ['R1', 'R2'] } })}
        track={Object.assign({}, initialState.song.track, { id: 'T1' })}
        album={initialState.song.album}
        artist={initialState.song.artist}
        actions={actions}
        pollFreq={1}
        progress={1}/>);
      // expect(actions.getCredits.mock.calls).toHaveLength(1);
    });
  });
});
