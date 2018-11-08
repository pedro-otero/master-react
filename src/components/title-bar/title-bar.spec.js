import React from 'react';
import { shallow } from 'enzyme';

import { TitleBar } from './title-bar';

describe('TitleBar component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<TitleBar title="Crews" />);
  });

  it('displays Crews', () => {
    expect(wrapper.find('Title').dive().text()).toEqual('Crews');
  });

  it('navigates when clicking avatar', (done) => {
    const onAvatarClick = jest.fn();
    wrapper.setProps({
      load: jest.fn(() => Promise.resolve('trackId')),
      onAvatarClick,
    });
    wrapper.find('Anchor').at(0).simulate('click');
    setTimeout(() => {
      expect(onAvatarClick).toBeCalled();
      done();
    }, 5);
  });
});
