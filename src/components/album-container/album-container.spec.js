import React from 'react';
import { shallow } from 'enzyme';

import { AlbumContainer } from './album-container';

describe('AlbumContainer component', () => {
  it('renders', () => {
    const props = {
      album: {
      },
      artist: {},
    };
    const wrapper = shallow(<AlbumContainer {...props} />);
    expect(wrapper.find('Album')).toHaveLength(1);
  });
});
