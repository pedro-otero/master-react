import React from 'react';
import { shallow } from 'enzyme';

import TrackItem from './track-item';

describe('Track item component', () => {
  const wrapper = shallow(<TrackItem
      composers={['C1']}
      name='Track'
      duration="0:01" />);

  it('renders name', () => {
    expect(wrapper.find('div[className="name"]').text()).toEqual('Track');
  });

  it('renders composers', () => {
    expect(wrapper.find('Composers').length).toEqual(1);
  });

  it('renders duration', () => {
    expect(wrapper.find('div[className="duration"]').text()).toEqual('0:01');
  });
});
