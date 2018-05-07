import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Song from './song';

const track = {
  artists: [{}],
  album: {
    images: [{}],
  },
};
const credits = { composers: [], producers: [], credits: {} };
const artist = { images: [{}] };
const album = { release_date: '' };

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
      track,
      album,
      artist,
    });
    expect(wrapper.find('div[className="search-not-started"]')).toHaveLength(1);
  });

  it('displays big progress indicator', () => {
    wrapper.setProps({
      bestMatch: credits,
      progress: 0,
      track: Object.assign({}, track, { id: 'T1' }),
      album,
      artist,
    });
    expect(wrapper.find('Progress[size="big"]')).toHaveLength(1);
  });

  it('does not display small progress indicator', () => {
    wrapper.setProps({
      bestMatch: credits,
      progress: 0,
      track: Object.assign({}, track, { id: 'T1' }),
      album,
      artist,
    });
    expect(wrapper.find('Progress[size="small"]')).toHaveLength(0);
  });

  it('does not display big progress indicator', () => {
    wrapper.setProps({
      bestMatch: Object.assign({}, credits, { credits: { P1: ['R1', 'R2'] } }),
      progress: 10,
      track: Object.assign({}, track, { id: 'T1' }),
      album,
      artist,
    });
    expect(wrapper.find('Progress[size="big"]')).toHaveLength(0);
  });

  it('displays small progress indicator', () => {
    wrapper.setProps({
      bestMatch: Object.assign({}, credits, { credits: { P1: ['R1', 'R2'] } }),
      progress: 10,
      track: Object.assign({}, track, { id: 'T1' }),
      album,
      artist,
    });
    expect(wrapper.find('Progress[size="small"]')).toHaveLength(1);
  });

  it('does not display big progress indicator', () => {
    wrapper.setProps({
      bestMatch: Object.assign({}, credits, { credits: { P1: ['R1', 'R2'] } }),
      progress: 100,
      track: Object.assign({}, track, { id: 'T1' }),
      album,
      artist,
    });
    expect(wrapper.find('progress[className="big-progress"]')).toHaveLength(0);
  });

  it('does not display small progress indicator', () => {
    wrapper.setProps({
      bestMatch: Object.assign({}, credits, { credits: { P1: ['R1', 'R2'] } }),
      progress: 100,
      track: Object.assign({}, track, { id: 'T1' }),
      album,
      artist,
    });
    expect(wrapper.find('progress[className="small-progress"]')).toHaveLength(0);
  });
});
