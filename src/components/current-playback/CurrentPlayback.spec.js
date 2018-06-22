import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as Rx from 'rxjs';

import { CurrentPlayback } from './CurrentPlayback';

Enzyme.configure({ adapter: new Adapter() });

describe('Current playback component', () => {
  it('Renders EmptyPlayback if nothing was passed', () => {
    const wrapper = shallow(<CurrentPlayback />);
    expect(wrapper.find('EmptyPlayback').length).toEqual(1);
  });

  it('Hides EmptyPlayback if ID was passed', () => {
    const wrapper = shallow(<CurrentPlayback id={1} />);
    expect(wrapper.find('EmptyPlayback').length).toEqual(0);
  });

  it('Renders redirect if ID was passed', () => {
    const wrapper = shallow(<CurrentPlayback id={1} />);
    expect(wrapper.find('Redirect').length).toEqual(1);
  });
});
