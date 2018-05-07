import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Song from './song';

const initialState = {
  track: {
    artists: [{}],
    album: {
      images: [{}],
    },
  },
  credits: { composers: [], producers: [], credits: {} },
  artist: { images: [{}] },
  album: { release_date: '' },
  progress: null,
};

Enzyme.configure({ adapter: new Adapter() });

describe('Song component', () => {
  const wrapper = shallow(<Song />);

  it('hides composers list', () => {
    expect(wrapper.find('span[className="composers"]')).toHaveLength(0);
  });

  it('hides producers list', () => {
    expect(wrapper.find('span[className="producers"]')).toHaveLength(0);
  });

  it('shows all-data-empty section', () => {
    expect(wrapper.find('div[className="all-data-empty"]')).toHaveLength(1);
  });

  it('displays the search not started div', () => {
    wrapper.setProps({
      track: initialState.track,
      album: initialState.album,
      artist: initialState.artist,
    });
    expect(wrapper.find('div[className="search-not-started"]')).toHaveLength(1);
  });

  it('displays big progress indicator', () => {
    wrapper.setProps({
      bestMatch: initialState.credits,
      progress: 0,
      track: Object.assign({}, initialState.track, { id: 'T1' }),
      album: initialState.album,
      artist: initialState.artist,
    });
    expect(wrapper.find('Progress[size="big"]')).toHaveLength(1);
  });

  it('does not display small progress indicator', () => {
    wrapper.setProps({
      bestMatch: initialState.credits,
      progress: 0,
      track: Object.assign({}, initialState.track, { id: 'T1' }),
      album: initialState.album,
      artist: initialState.artist,
    });
    expect(wrapper.find('Progress[size="small"]')).toHaveLength(0);
  });

  it('does not display big progress indicator', () => {
    wrapper.setProps({
      bestMatch: Object.assign({}, initialState.credits, { credits: { P1: ['R1', 'R2'] } }),
      progress: 10,
      track: Object.assign({}, initialState.track, { id: 'T1' }),
      album: initialState.album,
      artist: initialState.artist,
    });
    expect(wrapper.find('Progress[size="big"]')).toHaveLength(0);
  });

  it('displays small progress indicator', () => {
    wrapper.setProps({
      bestMatch: Object.assign({}, initialState.credits, { credits: { P1: ['R1', 'R2'] } }),
      progress: 10,
      track: Object.assign({}, initialState.track, { id: 'T1' }),
      album: initialState.album,
      artist: initialState.artist,
    });
    expect(wrapper.find('Progress[size="small"]')).toHaveLength(1);
  });

  it('does not display big progress indicator', () => {
    wrapper.setProps({
      bestMatch: Object.assign({}, initialState.credits, { credits: { P1: ['R1', 'R2'] } }),
      progress: 100,
      track: Object.assign({}, initialState.track, { id: 'T1' }),
      album: initialState.album,
      artist: initialState.artist,
    });
    expect(wrapper.find('progress[className="big-progress"]')).toHaveLength(0);
  });

  it('does not display small progress indicator', () => {
    wrapper.setProps({
      bestMatch: Object.assign({}, initialState.credits, { credits: { P1: ['R1', 'R2'] } }),
      progress: 100,
      track: Object.assign({}, initialState.track, { id: 'T1' }),
      album: initialState.album,
      artist: initialState.artist,
    });
    expect(wrapper.find('progress[className="small-progress"]')).toHaveLength(0);
  });
});
