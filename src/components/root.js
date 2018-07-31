import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';

import Welcome from 'components/Welcome';
import Errors from 'components/Errors';
import TitleBar from 'components/TitleBar';
import TrackContainer from 'components/TrackContainer';
import AlbumContainer from 'components/AlbumContainer';
import Home from 'components/Home';
import { loadPlaybackInfo } from '../redux/playbackInfo';
import { addError, clearErrors } from '../redux/errors';
import { loadProfile } from '../redux/profile';

export class Root extends React.Component {
  componentWillMount() {
    if (this.props.isAuthenticated) {
      this.props.loadProfile();
    }
  }

  getAuthUrl() {
    return `${process.env.REACT_APP_SPOTIFY_AUTHORIZE_URL}?${[
      ['client_id', process.env.REACT_APP_SPOTIFY_CLIENT_ID],
      ['response_type', 'token'],
      ['redirect_uri', this.props.redirectUri],
      ['state', 'reactApp'],
      ['scope', process.env.REACT_APP_SPOTIFY_SCOPES],
      ['show_dialog', 'false'],
    ].map(([key, value]) => `${key}=${value}`).join('&')}`;
  }

  render() {
    const { isNewUser, isAuthenticated, store } = this.props;
    if (isNewUser) {
      return <Welcome loginUrl={this.getAuthUrl()} />;
    } else if (!isAuthenticated) {
      window.location = this.getAuthUrl();
      return null;
    }
    return <Provider store={store}>
      <Router>
        <span>
          <Errors />
          <TitleBar title="Crews" />
          <div style={{ position: 'relative' }}>
            <Route exact path="/" component={Home} />
            <Route path="/track/:id" render={({ match }) => <TrackContainer trackId={match.params.id} />} />
            <Route path="/album/:id" render={({ match }) => <AlbumContainer albumId={match.params.id} />} />
          </div>
        </span>
      </Router>
    </Provider>;
  }
}

Root.propTypes = {
  addError: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isNewUser: PropTypes.bool,
  loadPlaybackInfo: PropTypes.func.isRequired,
  loadProfile: PropTypes.func.isRequired,
  onUnmount: PropTypes.func.isRequired,
  redirectUri: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
};

const mapStateToProps = ({ user: { auth: { token, expiry } } }) => ({
  isNewUser: !token && !expiry,
  isAuthenticated: typeof token !== 'undefined' && (Date.now() - (new Date(expiry)).getTime()) <= 0,
});

const mapDispatchToProps = dispatch => ({
  loadPlaybackInfo: () => dispatch(loadPlaybackInfo()),
  clearErrors: () => dispatch(clearErrors()),
  addError: error => dispatch(addError(error)),
  loadProfile: () => dispatch(loadProfile()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
