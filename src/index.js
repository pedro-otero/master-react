import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './containers/App';

const token = localStorage.getItem('token');
const expiry = localStorage.getItem('expiry');
const now = new Date().getTime();
const difference = now - expiry;
if (token && difference <= 0) {
  ReactDOM.render(<App/>, document.getElementById('root'));
  registerServiceWorker();
} else {
  window.location = `${process.env.REACT_APP_SPOTIFY_AUTHORIZE_URL}?${[
    ['client_id', process.env.REACT_APP_SPOTIFY_CLIENT_ID],
    ['response_type', 'token'],
    ['redirect_uri', process.env.REACT_APP_SPOTIFY_REDIRECT_URI],
    ['state', 'reactApp'],
    ['scope', process.env.REACT_APP_SPOTIFY_SCOPES],
    ['show_dialog', 'false'],
  ].map(pair => `${pair[0]}=${pair[1]}`).join('&')}`;
}
