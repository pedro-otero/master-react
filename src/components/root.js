import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import CurrentPlayback from './current-playback/CurrentPlayback';
import Album from './album/album';
import { loadAlbum, loadPlaybackInfo, loadTrack } from '../redux/actions/spotify';
import TrackDetails from './track-details/track-details';
import { loadSearchResult } from '../redux/actions/backend';
import { clearErrors } from '../redux/errors';
import Errors from './errors/errors';
import Welcome from './welcome/welcome';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.getAlbum = this.getAlbum.bind(this);
    this.getTrack = this.getTrack.bind(this);
    this.getPlaybackData = this.getPlaybackData.bind(this);
  }

  getPlaybackData() {
    this.props.clearErrors();
    this.props.loadPlaybackInfo();
    return <CurrentPlayback />;
  }

  getAlbum({ match }) {
    this.props.clearErrors();
    const { store } = this.props;
    const albumId = match.params.id;
    store.dispatch(loadAlbum(albumId));
    store.dispatch(loadSearchResult(albumId));
    return <Album albumId={match.params.id} />;
  }

  getTrack({ match }) {
    this.props.clearErrors();
    const { store } = this.props;
    store.dispatch(loadTrack(match.params.id));
    return <TrackDetails trackId={match.params.id} />;
  }

  render() {
    const { user, store } = this.props;
    if (user.isNew()) {
      return <Welcome loginUrl={user.getAuthUrl()} />;
    } else if (!user.isAuthenticated()) {
      window.location = user.getAuthUrl();
    }
    return <Provider store={store}>
      <Router>
        <span>
          <Errors />
          <Route
              exact
              path="/"
              render={this.getPlaybackData}
          />
          <Route
              path="/track/:id"
              render={this.getTrack}
          />
          <Route
              path="/album/:id"
              render={this.getAlbum}
          />
        </span>
      </Router>
    </Provider>;
  }
}

Root.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  loadPlaybackInfo: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => ({
  loadPlaybackInfo: () => dispatch(loadPlaybackInfo()),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(() => ({}), mapDispatchToProps)(Root);
