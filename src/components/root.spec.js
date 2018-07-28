import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Root } from './root';

Enzyme.configure({ adapter: new Adapter() });

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
});
