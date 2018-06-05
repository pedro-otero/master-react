import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import SpotifyWebApi from 'spotify-web-api-node';
import request from 'superagent';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/store';
import CurrentPlayback from './containers/CurrentPlayback';
import Album from './components/album';

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
        <span>
          <Route
              exact
              path="/"
              render={() => <CurrentPlayback onUnmount={() => backend.stopAllSearches} />}
            />
          <Route
              path="/album/:id"
              render={({ match }) => <Album albumId={match.params.id} />}
            />
        </span>
      </Router>
    </Provider>,
    document.getElementById('root'),
  );
} else {
  window.location = user.getAuthUrl();
}
