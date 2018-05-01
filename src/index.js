import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import registerServiceWorker from './registerServiceWorker';
import spotifyConfig from './config/spotify';
import AuthenticationWarning from "./components/AuthenticationWarning";
import App from "./containers/App";

let mountingNode =
  <AuthenticationWarning
    redirectUri={spotifyConfig.redirectUri}
    clientId={spotifyConfig.clientId}
    scopes={spotifyConfig.scopes}/>;

if (window.location.hash) {
    mountingNode = <App/>;
}

ReactDOM.render(mountingNode, document.getElementById('root'));
registerServiceWorker();
