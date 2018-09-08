import React from 'react';
import { shallow } from 'enzyme';

import { Menu } from './menu';

describe('Menu', () => {
  it('renders', () => {
    const wrapper = shallow(<Menu
        avatar="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"
        name="Someone McSomething"
        userId="someone_97"
        playback={{}} />);
    expect(wrapper.exists());
  });
});
