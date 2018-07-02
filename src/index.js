import React from 'react';
import ReactDOM from 'react-dom';
import SpotifyWebApi from 'spotify-web-api-node';
import request from 'superagent';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store';

import Backend from './api/backend';
import getUser from './user';
import Root from './components/root';

const backend = new Backend(request, `${process.env.REACT_APP_BE_DOMAIN}/data/album`, 1000);
const user = getUser(SpotifyWebApi, window);
if (window.location.hash) {
  user.saveToken(window.location.hash);
  window.history.pushState({}, '', '/');
}

registerServiceWorker();
const store = configureStore(user.getApi(), backend);
ReactDOM.render(
  <Root
      store={store}
      user={user}
      onUnmount={() => backend.stopAllSearches} />,
  document.getElementById('root'),
);
