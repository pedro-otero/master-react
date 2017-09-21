import {ConnectedRouter} from "react-router-redux";
import * as React from "react";
import Home from "./Home";
import {Provider} from 'react-redux';
import configureStore from '../store/configure';
import * as spotifyConfigurationActions from "../actions/spotifyConfig";
import * as authenticationActions from "../actions/authenticationData";
import createHistory from 'history/createBrowserHistory';
import spotifyConfig from '../config/spotify';

const history = createHistory();
const store = configureStore(history);
store.dispatch(authenticationActions.setAuthenticationData(window.location.hash));
store.dispatch(spotifyConfigurationActions.loadSpotifyConfiguration(spotifyConfig));

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Home/>
                </ConnectedRouter>
            </Provider>
        );
    }
}