import * as React from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import configureStore from '../store/configure';
import Song from '../components/song/song';

const history = createHistory();
const store = configureStore(history);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route exact path="/" component={Song}/>
        </Router>
      </Provider>
    );
  }
}
