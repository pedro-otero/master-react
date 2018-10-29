import React from 'react';
import { shallow } from 'enzyme';

import List from './list';

const Dummy = () => <span></span>;

describe('List', () => {
  it('filters items', () => {
    const wrapper = shallow(<List searchFields={['value']}>
      <Dummy value="lorem" />
      <Dummy value="ipsum" />
      <Dummy value="whatever" />
    </List>);
    wrapper.instance().setFilter('ips');
    expect(wrapper.update().find('Dummy').length).toEqual(1);
  });

  it('shows no results sign', () => {
    const wrapper = shallow(<List searchFields={['value']}>
      <Dummy value="lorem" />
      <Dummy value="ipsum" />
      <Dummy value="whatever" />
    </List>);
    wrapper.instance().setFilter('xxx');
    expect(wrapper.update().find('.em-man-gesturing-no').length).toEqual(1);
  });

  it('adds event listener', () => {
    jest.spyOn(document, 'addEventListener');
    shallow(<List />);
    expect(document.addEventListener).toHaveBeenCalled();
  });

  it('removes event listener', () => {
    jest.spyOn(document, 'removeEventListener');
    const wrapper = shallow(<List />);
    wrapper.unmount();
    expect(document.removeEventListener).toHaveBeenCalled();
  });
});
