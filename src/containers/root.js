import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import CurrentPlayback from '../containers/CurrentPlayback';
import Album from '../components/album';

class Root extends React.Component {
  componentWillUnmount() {
    this.props.onUnmount();
  }

  render() {
    const { store } = this.props;
    return <Provider store={store}>
      <Router>
        <span>
          <Route
              exact
              path="/"
              render={() => <CurrentPlayback />}
          />
          <Route
              path="/album/:id"
              render={({ match }) => <Album albumId={match.params.id} />}
          />
        </span>
      </Router>
    </Provider>;
  }
}

Root.propTypes = {
  onUnmount: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
};

export default Root;
