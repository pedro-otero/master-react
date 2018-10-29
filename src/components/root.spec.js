import React from 'react';
import { shallow } from 'enzyme';

import { Root } from './root';

describe('Root component', () => {
  it('Loads profile if user is authenticated', () => {
    const mock = jest.fn();
    shallow(<Root isAuthenticated={true} loadProfile={mock} />);
    expect(mock).toBeCalled();
  });

  it('generate auth url', () => {
    Object.assign(process.env, {
      REACT_APP_SPOTIFY_AUTHORIZE_URL: 'http://auth.org',
      REACT_APP_SPOTIFY_CLIENT_ID: 'clientId',
      REACT_APP_SPOTIFY_SCOPES: 'scopesList',
    });
    const wrapper = shallow(<Root redirectUri="http://localhost.com" />);
    expect(wrapper.instance().getAuthUrl()).toEqual('http://auth.org?client_id=clientId&response_type=token&redirect_uri=http://localhost.com&state=reactApp&scope=scopesList&show_dialog=false');
  });

  it('Renders Welcome component if user is new', () => {
    const wrapper = shallow(<Root isNewUser={true} />);
    expect(wrapper.find('Welcome')).toHaveLength(1);
  });

  it('Does not render anything if user is not authenticated', () => {
    const wrapper = shallow(<Root isNewUser={false} isAuthenticated={false} />);
    expect(wrapper.html()).toEqual(null);
  });

  it('renders app when user is authenticated', () => {
    const store = {
      getState: () => ({
        errors: [],
        user: {
          profile: { name: '' },
        },
      }),
    };
    const wrapper = shallow(<Root
        isNewUser={false}
        isAuthenticated={true}
        loadProfile={jest.fn()}
        store={store} />);
    expect(wrapper.find('Provider')).toHaveLength(1);
  });

  it('opens drawer', () => {
    const wrapper = shallow(<Root />);
    wrapper.instance().openMenu({ stopPropagation: () => ({}) });
    expect(wrapper.instance().state.drawerOpen).toEqual(true);
  });

  it('closed drawer', () => {
    const wrapper = shallow(<Root />);
    wrapper.instance().closeMenu();
    expect(wrapper.instance().state.drawerOpen).toEqual(false);
  });

  it('loads playback info', () => {
    const loadPlaybackInfo = jest.fn();
    const wrapper = shallow(<Root loadPlaybackInfo={loadPlaybackInfo} />);

    wrapper.instance().suscribeToPlayback();

    expect(loadPlaybackInfo).toBeCalled();
  });

  it('sets timer for getting playback info', () => {
    const setIntervalSpy = jest.spyOn(global.window, 'setInterval');
    const loadPlaybackInfo = jest.fn();
    const wrapper = shallow(<Root loadPlaybackInfo={loadPlaybackInfo} />);

    wrapper.instance().suscribeToPlayback();

    expect(setIntervalSpy.mock.calls[0][0]).toEqual(loadPlaybackInfo);

    setIntervalSpy.mockRestore();
  });

  it('clears timer for getting playback info', () => {
    const clearIntervalSpy = jest.spyOn(global.window, 'clearInterval');
    const wrapper = shallow(<Root />);
    const interval = setInterval(() => ({}), 5000);
    wrapper.instance().playbackInfoTimer = interval;

    wrapper.instance().unsuscribeToPlayback();

    expect(clearIntervalSpy.mock.calls[0][0]).toEqual(interval);

    clearIntervalSpy.mockRestore();
  });

  it('clears timer for getting playback info', () => {
    const wrapper = shallow(<Root />);

    wrapper.instance().unsuscribeToPlayback();

    expect(wrapper.instance().playbackInfoTimer).toEqual(null);
  });
});
