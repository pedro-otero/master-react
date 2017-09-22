import {ConnectedRouter} from "react-router-redux";
import * as React from "react";
import Home from "./Home";
import {Provider} from 'react-redux';
import configureStore from '../store/configure';
import * as authenticationActions from "../actions/authenticationData";
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const store = configureStore(history);
store.dispatch(authenticationActions.setAuthenticationData(window.location.hash));

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