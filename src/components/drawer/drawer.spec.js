import React from 'react';
import { shallow } from 'enzyme';

import Drawer from './drawer';

describe('Drawer component', () => {
  it('renders contents', () => {
    const wrapper = shallow(<Drawer open={100}>
      <span>A span</span>
    </Drawer>);
    expect(wrapper.find('span').text()).toBe('A span');
  });

  it('renders closed', () => {
    const wrapper = shallow(<Drawer open={0}>
    </Drawer>);
    expect(wrapper.find('Backdrop').dive().find('div').props().open).toBe(0);
  });

  it('calls back when opening', () => {
    const onOpen = jest.fn();
    const wrapper = shallow(<Drawer open={0} onOpen={onOpen}>
    </Drawer>);

    wrapper.setProps({ open: 100 });

    expect(onOpen).toBeCalled();
  });

  it('does not try to call back when opening if no callback passed', () => {
    const wrapper = shallow(<Drawer open={0}>
    </Drawer>);

    wrapper.setProps({ open: 100 });

    expect(wrapper).toBeDefined();
  });

  it('calls back when closing', () => {
    const onClose = jest.fn();
    const wrapper = shallow(<Drawer open={100} onClose={onClose}>
    </Drawer>);

    wrapper.setProps({ open: 0 });

    expect(onClose).toBeCalled();
  });

  it('does not try to call back when closing if no callback passed', () => {
    const wrapper = shallow(<Drawer open={100}>
    </Drawer>);

    wrapper.setProps({ open: 0 });

    expect(wrapper).toBeDefined();
  });
});
