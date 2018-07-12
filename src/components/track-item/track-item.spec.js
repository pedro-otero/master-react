import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TrackItem from './track-item';

Enzyme.configure({ adapter: new Adapter() });

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
