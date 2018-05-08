import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Artist from './artist';

Enzyme.configure({ adapter: new Adapter() });

describe('Artist label component', () => {
  it('displays artist message', () => {
    const wrapper = shallow(<Artist
        className="someClass"
        name="someone" />);
    expect(wrapper.find('span[className="someClass"]').text()).toEqual('someone');
  });
});
