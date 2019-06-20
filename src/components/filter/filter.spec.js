import React from 'react';
import { shallow } from 'enzyme';

import { Filter } from './filter';

describe('Filter', () => {
  it('sets value', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Filter onChange={onChange} />);

    wrapper.find('Input').dive().simulate('change', { target: { value: 'ips' } });

    expect(onChange).toBeCalledWith('ips');
  });

  it('clears value', () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Filter onChange={onChange} />);

    wrapper.find('Clear').dive().simulate('click');

    expect(onChange).toBeCalledWith('');
  });
});
