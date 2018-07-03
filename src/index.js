import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import request from 'superagent';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store';

import Backend from './api/backend';
import getUser from './user';
import Root from './components/root';
import { parseToken, setToken } from './redux/user';

const backend = new Backend(request, `${process.env.REACT_APP_BE_DOMAIN}/data/album`, 1000);
const user = getUser(SpotifyWebApi, window);

const store = configureStore(user.getApi(), backend);
if (window.location.hash) {
  const tokenAction = parseToken(window.location.hash);
  window.history.pushState({}, '', '/');
  store.dispatch(tokenAction);
  const { data: { token, expiry } } = tokenAction;
  localStorage.setItem('token', token);
  localStorage.setItem('expiry', expiry);
} else {
  const token = localStorage.getItem('token');
  const expiry = localStorage.getItem('expiry');
  store.dispatch(setToken(token, expiry));
}

registerServiceWorker();
ReactDOM.render(
  <Root
      store={store}
      onUnmount={() => backend.stopAllSearches} />,
  document.getElementById('root'),
);
