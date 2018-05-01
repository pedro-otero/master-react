import * as React from "react";
import {Provider} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {ConnectedRouter} from "react-router-redux";

import Home from "./Home";
import configureStore from '../store/configure';

const history = createHistory();
const store = configureStore(history, window.location.hash);

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
