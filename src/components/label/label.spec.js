import React from 'react';
import { shallow } from 'enzyme';

import Label from './label';

describe('Label component', () => {
  it('displays artist message', () => {
    const wrapper = shallow(<Label
        className="someClass"
        value="someone" />);
    expect(wrapper.find('span[className="someClass"]').text()).toEqual('someone');
  });
});
