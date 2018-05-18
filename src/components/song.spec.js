import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Song from './song';

const track = { artists: [{}] };
const credits = { composers: [], producers: [], credits: {} };
const artist = { images: [{ url: 'ImgUrl' }] };
const album = { release_date: '', images: [{}] };

Enzyme.configure({ adapter: new Adapter() });

describe('Song component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Song />);
  });

  it('hides composers list', () => {
    expect(wrapper.find('JointList[className="composers"]')).toHaveLength(0);
  });

  it('hides producers list', () => {
    expect(wrapper.find('JointList[className="producers"]')).toHaveLength(0);
  });

  it('shows spotify info loading circle', () => {
    expect(wrapper.find('LoadingCircle[message="Loading data from Spotify..."]')).toHaveLength(1);
  });

  it('displays the search not started loading circle', () => {
    wrapper.setProps({
      track,
      album,
      artist,
    });
    expect(wrapper.find('LoadingCircle[message="Starting search..."]')).toHaveLength(1);
  });

  it('displays the banner', () => {
    wrapper.setProps({
      track,
      album,
      artist,
    });
    expect(wrapper.find('Banner').prop('src')).toEqual('ImgUrl');
  });

  it('does not break when artist has no images', () => {
    wrapper.setProps({
      track,
      artist: { images: [] },
      album,
    });
    expect(wrapper.find('Banner').prop('src')).toBeUndefined();
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
    expect(wrapper.find('Progress[className="big-progress"]')).toHaveLength(0);
  });

  it('does not display small progress indicator', () => {
    wrapper.setProps({
      bestMatch: Object.assign({}, credits, { credits: { P1: ['R1', 'R2'] } }),
      progress: 100,
      track: Object.assign({}, track, { id: 'T1' }),
      album,
      artist,
    });
    expect(wrapper.find('Progress[className="small-progress"]')).toHaveLength(0);
  });
});
