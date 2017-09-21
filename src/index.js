import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import SpotifyConfig from './config/spotify';
import AuthenticationWarning from "./components/AuthenticationWarning";
import Home from "./Home";

let mountingNode =
    <AuthenticationWarning
        redirectUri={SpotifyConfig.redirectUri}
        clientId={SpotifyConfig.clientId}
        scopes={SpotifyConfig.scopes}/>;

if (window.location.hash) {
    const auth = window.location.hash.substr(1).split('&')
        .map(pair => pair.split('='))
        .reduce((all, pair) => Object.defineProperty(all, pair[0], {enumerable: true, value: pair[1]}), {});
    mountingNode = <Home auth={auth} clientId={SpotifyConfig.clientId} redirectUri={SpotifyConfig.redirectUri}/>;;
}

ReactDOM.render(mountingNode, document.getElementById('root'));
registerServiceWorker();
