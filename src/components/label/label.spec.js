import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Label from './label';

Enzyme.configure({ adapter: new Adapter() });

describe('Label component', () => {
  it('displays artist message', () => {
    const wrapper = shallow(<Label
        className="someClass"
        value="someone" />);
    expect(wrapper.find('span[className="someClass"]').text()).toEqual('someone');
  });
});
