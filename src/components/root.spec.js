import React from 'react';
import { shallow } from 'enzyme';

import { Root } from './root';

describe('Root component', () => {
  beforeAll(() => {
    global.window.matchMedia = () => ({});
  });

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
});
