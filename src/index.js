import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import SpotifyConfig from './config/spotify';
import AuthenticationWarning from "./components/AuthenticationWarning";
import Home from "./Home";
import {Provider} from 'react-redux';
import configureStore from './store/configure';

let mountingNode =
    <AuthenticationWarning
        redirectUri={SpotifyConfig.redirectUri}
        clientId={SpotifyConfig.clientId}
        scopes={SpotifyConfig.scopes}/>;

if (window.location.hash) {
    const store = configureStore();
    const auth = window.location.hash.substr(1).split('&')
        .map(pair => pair.split('='))
        .reduce((all, pair) => Object.defineProperty(all, pair[0], {enumerable: true, value: pair[1]}), {});
    mountingNode =
        <Provider store={store}>
            <Home
                auth={auth}
                clientId={SpotifyConfig.clientId}
                redirectUri={SpotifyConfig.redirectUri}/>
        </Provider>;
}

ReactDOM.render(mountingNode, document.getElementById('root'));
registerServiceWorker();
