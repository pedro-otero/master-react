import React from 'react';
import { shallow } from 'enzyme';

import LoadFailure from './load-failure';

describe('Load Failure component', () => {
  it('displays a load failure icon', () => {
    const store = {
      getState: () => ({
        tracks: {
          T1: { failed: true },
        },
      }),
      subscribe: () => {},
    };

    const wrapper = shallow(<LoadFailure
        id="T1"
        itemType="tracks"
        store={store} />)
      .dive();

    expect(wrapper.find('i').hasClass('em em--1')).toEqual(true);
  });

  it('displays a load failure message', () => {
    const store = {
      getState: () => ({
        tracks: {
          T1: { failed: true },
        },
      }),
      subscribe: () => {},
    };

    const wrapper = shallow(<LoadFailure
        id="T1"
        itemType="tracks"
        message="FAILED!!!"
        store={store} />)
      .dive();

    expect(wrapper.find('h1').text()).toEqual('FAILED!!!');
  });

  it('displays nothing if item is not failed', () => {
    const store = {
      getState: () => ({
        tracks: {
          T1: { failed: false },
        },
      }),
      subscribe: () => {},
    };

    const wrapper = shallow(<LoadFailure
        id="T1"
        itemType="tracks"
        store={store} />)
      .dive();

    expect(wrapper.type()).toBeFalsy();
  });

  it('displays nothing if item is does not exist', () => {
    const store = {
      getState: () => ({
        tracks: {},
      }),
      subscribe: () => {},
    };

    const wrapper = shallow(<LoadFailure
        id="T1"
        itemType="tracks"
        store={store} />)
      .dive();

    expect(wrapper.type()).toBeFalsy();
  });
});
