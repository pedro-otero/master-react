import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import CurrentPlayback from '../containers/CurrentPlayback';
import Album from '../components/album';
import { loadAlbum, loadPlaybackInfo } from '../redux/actions/spotify';
import TrackDetails from '../components/track-details';
import { loadSearchResult } from '../redux/actions/backend';

class Root extends React.Component {
  componentDidMount() {
    this.getPlaybackData();
  }

  getPlaybackData() {
    this.props.loadPlaybackInfo();
    this.timer = setInterval(this.props.loadPlaybackInfo, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
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
              component={CurrentPlayback}
          />
          <Route
              path="/track/:id"
              render={({ match }) => <TrackDetails trackId={match.params.id} />}
          />
          <Route
              path="/album/:id"
              render={({ match }) => {
                const albumId = match.params.id;
                store.dispatch(loadAlbum(albumId));
                store.dispatch(loadSearchResult(albumId));
                return <Album albumId={match.params.id} />;
              }}
          />
        </span>
      </Router>
    </Provider>;
  }
}

Root.propTypes = {
  loadPlaybackInfo: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loadPlaybackInfo: () => dispatch(loadPlaybackInfo()),
});

export default connect(() => ({}), mapDispatchToProps)(Root);
