import React from 'react';
import { shallow } from 'enzyme';

import { Root } from './root';

describe('Root component', () => {
  beforeAll(() => {
    global.window.matchMedia = () => ({});
  });

  it('Loads profile if user is authenticated', () => {
    const mock = jest.fn();
    shallow(<Root
        isAuthenticated={true}
        loadProfile={mock}
        progress={{ available: false }} />);
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
    const wrapper = shallow(<Root
        isNewUser={false}
        isAuthenticated={true}
        loadProfile={jest.fn()}
        progress={{ available: false }} />);
    expect(wrapper.find('Provider')).toHaveLength(1);
  });

  it('renders progress', () => {
    const wrapper = shallow(<Root
        isNewUser={false}
        isAuthenticated={true}
        loadProfile={jest.fn()}
        progress={{ available: true, value: 50 }} />);

    expect(wrapper.find('Progress[value=50][size="small"]')).toHaveLength(1);
  });

  it('hides progress', () => {
    const wrapper = shallow(<Root
        isNewUser={false}
        isAuthenticated={true}
        loadProfile={jest.fn()}
        progress={{ available: false }} />);

    expect(wrapper.find('Progress')).toHaveLength(0);
  });

  it('renders loading sign', () => {
    const wrapper = shallow(<Root
        isNewUser={false}
        isAuthenticated={true}
        loadProfile={jest.fn()}
        progress={{ available: false, loading: 'A message' }} />);

    expect(wrapper.find('LoadingCircle[message="A message"]')).toHaveLength(1);
  });

  it('hides loading sign', () => {
    const wrapper = shallow(<Root
        isNewUser={false}
        isAuthenticated={true}
        loadProfile={jest.fn()}
        progress={{ available: false }} />);

    expect(wrapper.find('LoadingCircle')).toHaveLength(0);
  });
});
