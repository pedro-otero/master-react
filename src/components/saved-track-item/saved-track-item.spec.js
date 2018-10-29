import React from 'react';
import { shallow } from 'enzyme';

import SavedTrackItem from './saved-track-item';

describe('Saved Track Item', () => {
  it('renders', () => {
    const wrapper = shallow(<SavedTrackItem
        name="The name"
        album="the album"
        artist="The artist" />);
    expect(wrapper.find('ListItem').length).toEqual(1);
  });
});
