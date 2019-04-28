import React from 'react';
import { shallow } from 'enzyme';

import { TrackDetails } from './track-details';

const credits = { composers: [], producers: [], credits: {} };

describe('TrackDetails component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TrackDetails />);
  });

  it('hides composers and producers list', () => {
    expect(wrapper.find('JointList')).toHaveLength(0);
  });

  it('displays the banner', () => {
    wrapper.setProps({
      name: 'Track name',
      background: 'ImgUrl',
    });
    expect(wrapper.find('ArtistWork').prop('title')).toEqual('Track name');
  });

  it('does not display small progress indicator', () => {
    wrapper.setProps({
      name: 'Track',
      progress: 0,
    });
    expect(wrapper.find('Progress[size="small"]')).toHaveLength(0);
  });

  it('does not display big progress indicator', () => {
    wrapper.setProps({
      name: 'Track',
      progress: 10,
    });
    expect(wrapper.find('Progress[size="big"]')).toHaveLength(0);
  });

  it('does not display big progress indicator', () => {
    wrapper.setProps({
      name: 'Track',
      progress: 100,
    });
    expect(wrapper.find('Progress[className="big-progress"]')).toHaveLength(0);
  });

  it('does not display small progress indicator', () => {
    wrapper.setProps({
      name: 'Track',
      progress: 100,
    });
    expect(wrapper.find('Progress[className="small-progress"]')).toHaveLength(0);
  });
});
