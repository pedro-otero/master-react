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

  it('starts loading search results of album just viewed', () => {
    const loadSearchResult = jest.fn();
    const wrapper = shallow(<Root
        isNewUser={false}
        isAuthenticated={true}
        loadProfile={jest.fn()}
        progress={{ available: false }}
        loadSearchResult={loadSearchResult} />);

    wrapper.setProps({ viewing: 'ALBUM_ID' });

    expect(loadSearchResult).toHaveBeenCalledWith('ALBUM_ID');
  });

  it('continues to load search results of album in view', () => {
    const setTimeoutSpy = jest.spyOn(global.window, 'setTimeout');
    const loadSearchResult = jest.fn();
    const wrapper = shallow(<Root
        isNewUser={false}
        isAuthenticated={true}
        loadProfile={jest.fn()}
        progress={{ available: false }}
        loadSearchResult={loadSearchResult}
        viewing='ALBUM_ID' />);

    wrapper.setProps({ progress: { available: true } });

    expect(setTimeoutSpy).toHaveBeenCalledWith(loadSearchResult, 1000, 'ALBUM_ID');

    setTimeoutSpy.mockRestore();
  });

  it('continues to load search results of album in view not finished yet', () => {
    const setTimeoutSpy = jest.spyOn(global.window, 'setTimeout');
    const loadSearchResult = jest.fn();
    const wrapper = shallow(<Root
        isNewUser={false}
        isAuthenticated={true}
        loadProfile={jest.fn()}
        progress={{ available: true, value: 30 }}
        loadSearchResult={loadSearchResult}
        viewing='ALBUM_ID' />);

    wrapper.setProps({ progress: { available: true, value: 50 } });

    expect(setTimeoutSpy).toHaveBeenCalledWith(loadSearchResult, 1000, 'ALBUM_ID');

    setTimeoutSpy.mockRestore();
  });

  it('stops loading search results once progress is not available (finish assumed)', () => {
    const setTimeoutSpy = jest.spyOn(global.window, 'setTimeout');
    const loadSearchResult = jest.fn();
    const wrapper = shallow(<Root
        isNewUser={false}
        isAuthenticated={true}
        loadProfile={jest.fn()}
        progress={{ available: true, value: 30 }}
        loadSearchResult={loadSearchResult}
        viewing='ALBUM_ID' />);

    wrapper.setProps({ progress: { available: false } });

    expect(setTimeoutSpy).not.toHaveBeenCalled();

    setTimeoutSpy.mockRestore();
  });

  it('does not schedule a search when viewing id is removed', () => {
    const setTimeoutSpy = jest.spyOn(global.window, 'setTimeout');
    const wrapper = shallow(<Root
        isNewUser={false}
        isAuthenticated={true}
        loadProfile={jest.fn()}
        progress={{ available: true, value: 30 }}
        viewing='ALBUM_ID' />);

    wrapper.setProps({ viewing: undefined });

    expect(setTimeoutSpy).not.toHaveBeenCalled();

    setTimeoutSpy.mockRestore();
  });

  it('does not load search when viewing id is removed', () => {
    const loadSearchResult = jest.fn();
    const wrapper = shallow(<Root
        isNewUser={false}
        isAuthenticated={true}
        loadProfile={jest.fn()}
        loadSearchResult={loadSearchResult}
        progress={{ available: true, value: 30 }}
        viewing='ALBUM_ID' />);

    wrapper.setProps({ viewing: undefined });

    expect(loadSearchResult).not.toHaveBeenCalled();
  });
});
