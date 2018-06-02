import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import request from 'superagent';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store';
import App from './containers/App';

import getBackend from './api/backend';
import getUser from './user';

const Backend = getBackend(request, `${process.env.REACT_APP_BE_DOMAIN}/data/album`, 1000);
const backend = new Backend();
const user = getUser(SpotifyWebApi, window);

registerServiceWorker();
if (user.isAuthenticated()) {
  const store = configureStore(user.getApi());
  ReactDOM.render(
    <Provider store={store}>
      <App
          spotifyApi={user.getApi()}
          backend={backend} />
    </Provider>,
    document.getElementById('root'),
  );
} else {
  window.location = user.getAuthUrl();
}
