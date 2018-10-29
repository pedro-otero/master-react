import React from 'react';
import { shallow } from 'enzyme';

import Drawer from './drawer';

describe('Drawer component', () => {
  it('renders contents', () => {
    const wrapper = shallow(<Drawer open>
      <span>A span</span>
    </Drawer>);
    expect(wrapper.find('span').text()).toBe('A span');
  });

  it('renders closed', () => {
    const wrapper = shallow(<Drawer open={false}>
    </Drawer>);
    expect(wrapper.find('BaseContainer').dive().find('div').props().open).toBe(false);
  });

  it('calls back when opening', () => {
    const onOpen = jest.fn();
    const wrapper = shallow(<Drawer open={false} onOpen={onOpen}>
    </Drawer>);

    wrapper.setProps({ open: true });

    expect(onOpen).toBeCalled();
  });

  it('does not try to call back when opening if no callback passed', () => {
    const wrapper = shallow(<Drawer open={false}>
    </Drawer>);

    wrapper.setProps({ open: true });

    expect(wrapper).toBeDefined();
  });

  it('calls back when closing', () => {
    const onClose = jest.fn();
    const wrapper = shallow(<Drawer open={true} onClose={onClose}>
    </Drawer>);

    wrapper.setProps({ open: false });

    expect(onClose).toBeCalled();
  });

  it('does not try to call back when closing if no callback passed', () => {
    const wrapper = shallow(<Drawer open={true}>
    </Drawer>);

    wrapper.setProps({ open: false });

    expect(wrapper).toBeDefined();
  });
});
