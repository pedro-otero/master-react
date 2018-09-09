import React from 'react';
import { shallow } from 'enzyme';

import SavedAlbumItem from './saved-album-item';

describe('Saved Album Item', () => {
  it('renders', () => {
    const wrapper = shallow(<SavedAlbumItem
        name="The name"
        artist="The artist" />);
    expect(wrapper.find('ListItem').length).toEqual(1);
  });
});
