import React from 'react';
import { shallow } from 'enzyme';

import { TrackContainer } from './track-container';

describe('TrackContainer component', () => {
  it('renders', () => {
    const props = {
      track: {
      },
      album: {
      },
      artist: {},
    };
    const wrapper = shallow(<TrackContainer {...props} />);
    expect(wrapper.find('TrackDetails')).toHaveLength(1);
  });
});
