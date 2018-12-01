import React from 'react';
import { shallow } from 'enzyme';

import { Menu } from './menu';

describe('Menu', () => {
  it('renders', () => {
    const wrapper = shallow(<Menu
        avatar="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"
        name="Someone McSomething"
        userId="someone_97"
        playback={{}} />);
    expect(wrapper.exists());
  });

  it('loads playback info', () => {
    const loadPlaybackInfo = jest.fn();
    const wrapper = shallow(<Menu
        avatar="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"
        name="Someone McSomething"
        userId="someone_97"
        playback={{}}
        loadPlaybackInfo={loadPlaybackInfo} />);

    wrapper.instance().subscribeToPlayback();

    expect(loadPlaybackInfo).toBeCalled();
  });

  it('sets timer for getting playback info', () => {
    const setIntervalSpy = jest.spyOn(global.window, 'setInterval');
    const loadPlaybackInfo = jest.fn();
    const wrapper = shallow(<Menu
        avatar="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"
        name="Someone McSomething"
        userId="someone_97"
        playback={{}}
        loadPlaybackInfo={loadPlaybackInfo} />);

    wrapper.instance().subscribeToPlayback();

    expect(setIntervalSpy.mock.calls[0][0]).toEqual(loadPlaybackInfo);

    setIntervalSpy.mockRestore();
  });

  it('clears timer for getting playback info', () => {
    const clearIntervalSpy = jest.spyOn(global.window, 'clearInterval');
    const wrapper = shallow(<Menu
        avatar="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"
        name="Someone McSomething"
        userId="someone_97"
        playback={{}} />);
    const interval = setInterval(() => ({}), 5000);
    wrapper.instance().playbackInfoTimer = interval;

    wrapper.instance().unsubscribeToPlayback();

    expect(clearIntervalSpy.mock.calls[0][0]).toEqual(interval);

    clearIntervalSpy.mockRestore();
  });

  it('clears timer for getting playback info', () => {
    const wrapper = shallow(<Menu
        avatar="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"
        name="Someone McSomething"
        userId="someone_97"
        playback={{}} />);

    wrapper.instance().unsubscribeToPlayback();

    expect(wrapper.instance().playbackInfoTimer).toEqual(null);
  });

  it('subscribes to playback info when it is shown', () => {
    const loadPlaybackInfo = jest.fn();
    const wrapper = shallow(<Menu
        avatar="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"
        name="Someone McSomething"
        userId="someone_97"
        playback={{}}
        loadPlaybackInfo={loadPlaybackInfo}
        isVisible={false} />);
    const subscribe = jest.spyOn(wrapper.instance(), 'subscribeToPlayback');

    wrapper.setProps({ isVisible: true });

    expect(subscribe).toBeCalled();
  });

  it('unsubscribes from playback info when it is no longer visible', () => {
    const wrapper = shallow(<Menu
        avatar="https://i.scdn.co/image/44272fc0e3bd34b073f34c175dddac5414908730"
        name="Someone McSomething"
        userId="someone_97"
        playback={{}}
        isVisible />);
    const unsubscribe = jest.spyOn(wrapper.instance(), 'unsubscribeToPlayback');

    wrapper.setProps({ isVisible: false });

    expect(unsubscribe).toBeCalled();
  });
});
