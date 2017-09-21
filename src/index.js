import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import spotifyConfig from './config/spotify';
import AuthenticationWarning from "./components/AuthenticationWarning";
import Home from "./Home";
import {Provider} from 'react-redux';
import configureStore from './store/configure';
import * as spotifyConfigurationActions from "./actions/spotifyConfig";
import * as authenticationActions from "./actions/authenticationData";

let mountingNode =
    <AuthenticationWarning
        redirectUri={spotifyConfig.redirectUri}
        clientId={spotifyConfig.clientId}
        scopes={spotifyConfig.scopes}/>;

if (window.location.hash) {
    const store = configureStore();
    store.dispatch(authenticationActions.setAuthenticationData(window.location.hash));
    store.dispatch(spotifyConfigurationActions.loadSpotifyConfiguration(spotifyConfig));
    mountingNode =
        <Provider store={store}>
            <Home/>
        </Provider>;
}

ReactDOM.render(mountingNode, document.getElementById('root'));
registerServiceWorker();
