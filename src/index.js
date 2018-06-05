import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import request from 'superagent';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store';
import App from './containers/App';

import Backend from './api/backend';
import getUser from './user';

const backend = new Backend(request, `${process.env.REACT_APP_BE_DOMAIN}/data/album`, 1000);
const user = getUser(SpotifyWebApi, window);

registerServiceWorker();
if (user.isAuthenticated()) {
  const store = configureStore(user.getApi(), backend);
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route
            path="/"
            render={() => <App backend={backend} />}
            />
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
} else {
  window.location = user.getAuthUrl();
}
