import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TrackDetails from './track-details';

const credits = { composers: [], producers: [], credits: {} };

Enzyme.configure({ adapter: new Adapter() });

describe('TrackDetails component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TrackDetails />);
  });

  it('hides composers and producers list', () => {
    expect(wrapper.find('JointList')).toHaveLength(0);
  });

  it('shows spotify info loading circle', () => {
    expect(wrapper.find('LoadingCircle[message="Loading data from Spotify..."]')).toHaveLength(1);
  });

  it('displays the search not started loading circle', () => {
    wrapper.setProps({
      name: 'Track name',
    });
    expect(wrapper.find('LoadingCircle[message="Starting search..."]')).toHaveLength(1);
  });

  it('displays the banner', () => {
    wrapper.setProps({
      name: 'Track name',
      background: 'ImgUrl',
    });
    expect(wrapper.find('ArtistWork').prop('title')).toEqual('Track name');
  });

  it('displays big progress indicator', () => {
    wrapper.setProps({
      name: 'Track',
      bestMatch: credits,
      progress: 0,
    });
    expect(wrapper.find('Progress[size="big"]')).toHaveLength(1);
  });

  it('does not display small progress indicator', () => {
    wrapper.setProps({
      name: 'Track',
      bestMatch: credits,
      progress: 0,
    });
    expect(wrapper.find('Progress[size="small"]')).toHaveLength(0);
  });

  it('does not display big progress indicator', () => {
    wrapper.setProps({
      name: 'Track',
      bestMatch: Object.assign({}, credits, { credits: { P1: ['R1', 'R2'] } }),
      progress: 10,
    });
    expect(wrapper.find('Progress[size="big"]')).toHaveLength(0);
  });

  it('displays small progress indicator', () => {
    wrapper.setProps({
      name: 'Track',
      bestMatch: Object.assign({}, credits, { credits: { P1: ['R1', 'R2'] } }),
      progress: 10,
    });
    expect(wrapper.find('Progress[size="small"]')).toHaveLength(1);
  });

  it('does not display big progress indicator', () => {
    wrapper.setProps({
      name: 'Track',
      bestMatch: Object.assign({}, credits, { credits: { P1: ['R1', 'R2'] } }),
      progress: 100,
    });
    expect(wrapper.find('Progress[className="big-progress"]')).toHaveLength(0);
  });

  it('does not display small progress indicator', () => {
    wrapper.setProps({
      name: 'Track',
      bestMatch: Object.assign({}, credits, { credits: { P1: ['R1', 'R2'] } }),
      progress: 100,
    });
    expect(wrapper.find('Progress[className="small-progress"]')).toHaveLength(0);
  });
});
