import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TrackItem from './track-item';

Enzyme.configure({ adapter: new Adapter() });

describe('Track item component', () => {
  const wrapper = shallow(<TrackItem
      composers={['C1']}
      name= 'Track'
      millis={ 1000 } />);

  it('renders name', () => {
    expect(wrapper.find('div[className="track-item-name"]').text()).toEqual('Track');
  });

  it('renders composers', () => {
    expect(wrapper.find('Composers').length).toEqual(1);
  });

  it('renders duration', () => {
    expect(wrapper.find('div[className="track-item-duration"]').text()).toEqual('0:01');
  });
});
