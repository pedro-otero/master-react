import React from 'react';
import { shallow } from 'enzyme';

import { Errors } from './errors';

describe('Errors component', () => {
  it('displays lists of errors', () => {
    const errors = [1, 2, 3];
    const wrapper = shallow(<Errors list={errors} />);
    expect(wrapper.find('Error')).toHaveLength(3);
  });
});
