import React from 'react';
import { shallow } from 'enzyme';

import { TitleBar } from './title-bar';

describe('TitleBar component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TitleBar />);
  });

  it('displays Crews when loading=true', () => {
    wrapper.setProps({ loading: true });
    expect(wrapper.find('Title').dive().text()).toEqual('Crews');
  });

  it('displays name when loading=false', () => {
    wrapper.setProps({ loading: false, name: 'First Last' });
    expect(wrapper.find('Title').dive().text()).toEqual('First Last');
  });

  it('navigates when clicking avatar', (done) => {
    const push = jest.fn();
    wrapper.setProps({
      load: jest.fn(() => Promise.resolve('trackId')),
      history: {
        push,
      },
    });
    wrapper.find('Anchor').at(0).simulate('click');
    setTimeout(() => {
      expect(push).toBeCalled();
      done();
    }, 5);
  });
});
