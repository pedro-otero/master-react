import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import AuthenticationWarning from './components/AuthenticationWarning';
import App from './containers/App';

let mountingNode =
  <AuthenticationWarning
    redirectUri={process.env.REACT_APP_SPOTIFY_REDIRECT_URI}
    clientId={process.env.REACT_APP_SPOTIFY_CLIENT_ID}
    scopes={process.env.REACT_APP_SPOTIFY_SCOPES}/>;

if (window.location.hash) {
  mountingNode = <App/>;
}

ReactDOM.render(mountingNode, document.getElementById('root'));
registerServiceWorker();
