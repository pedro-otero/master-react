import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import CurrentPlayback from './current-playback/CurrentPlayback';
import Album from './album/album';
import { loadPlaybackInfo } from '../redux/playbackInfo';
import { loadSearchResult } from '../redux/actions/backend';
import { loadAlbum } from '../redux/albums';
import { loadTrack } from '../redux/tracks';
import { clearErrors } from '../redux/errors';
import Errors from './errors/errors';
import Welcome from './welcome/welcome';
import TitleBar from './title-bar/title-bar';
import Home from './home/home';
import { loadProfile } from '../redux/profile';
import TrackContainer from './track-container/track-container';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.getAlbum = this.getAlbum.bind(this);
    this.getPlaybackData = this.getPlaybackData.bind(this);
  }

  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.loadProfile();
    }
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

  getAuthUrl() {
    return `${process.env.REACT_APP_SPOTIFY_AUTHORIZE_URL}?${[
      ['client_id', process.env.REACT_APP_SPOTIFY_CLIENT_ID],
      ['response_type', 'token'],
      ['redirect_uri', window.location.origin],
      ['state', 'reactApp'],
      ['scope', process.env.REACT_APP_SPOTIFY_SCOPES],
      ['show_dialog', 'false'],
    ].map(pair => `${pair[0]}=${pair[1]}`).join('&')}`;
  }

  render() {
    const { isNewUser, isAuthenticated, store } = this.props;
    if (isNewUser) {
      return <Welcome loginUrl={this.getAuthUrl()} />;
    } else if (!isAuthenticated) {
      window.location = this.getAuthUrl();
    }
    return <Provider store={store}>
      <Router>
        <span>
          <TitleBar
              title="Crews"
              onLogout={() => {
            window.localStorage.clear();
            window.location = '/';
          }} />
          <div style={{ position: 'relative' }}>
            <Errors />
            <Route exact path="/" component={Home} />
            <Route path="/player" render={this.getPlaybackData} />
            <Route path="/track/:id" render={({ match }) => <TrackContainer trackId={match.params.id} />} />
            <Route path="/album/:id" render={this.getAlbum} />
          </div>
        </span>
      </Router>
    </Provider>;
  }
}

Root.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isNewUser: PropTypes.bool,
  loadPlaybackInfo: PropTypes.func.isRequired,
  loadProfile: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
};

const mapStateToProps = ({ user: { auth: { token, expiry } } }) => ({
  isNewUser: !token && !expiry,
  isAuthenticated: typeof token !== 'undefined' && (Date.now() - (new Date(expiry)).getTime()) <= 0,
});

const mapDispatchToProps = dispatch => ({
  loadPlaybackInfo: () => dispatch(loadPlaybackInfo()),
  clearErrors: () => dispatch(clearErrors()),
  loadProfile: () => dispatch(loadProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
