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
import Drawer from 'components/Drawer';
import Menu from 'components/Menu';
import SavedTracks from 'components/SavedTracks';
import SavedAlbums from 'components/SavedAlbums';
import { loadProfile } from 'state/profile';
import { loadPlaybackInfo } from 'state/playbackInfo';
import Artist from "components/Artist";

export class Root extends React.Component {
  state = {
    drawerOpen: false,
  };

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

  openMenu = (e) => {
    e.stopPropagation();
    this.setState({ drawerOpen: true });
  };

  closeMenu = () => this.setState({ drawerOpen: false });

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
        <span onClick={this.closeMenu}>
          <Errors />
          <TitleBar onAvatarClick={this.openMenu} />
          <Drawer
              open={this.state.drawerOpen}
              bgColor="#222222"
              opacity={0.95}>
            <Menu isVisible={this.state.drawerOpen} />
          </Drawer>
          <div style={{ position: 'relative' }}>
            <Route exact path="/" component={Home} />
            <Route path="/track/:id" render={({ match }) => <TrackContainer trackId={match.params.id} />} />
            <Route path="/album/:id" render={({ match }) => <AlbumContainer albumId={match.params.id} />} />
            <Route path="/artist/:id" render={({ match }) => <Artist id={match.params.id} />} />
            <Route path="/user/tracks" render={() => <SavedTracks />} />
            <Route path="/user/albums" render={() => <SavedAlbums />} />
          </div>
        </span>
      </Router>
    </Provider>;
  }
}

Root.propTypes = {
  isAuthenticated: PropTypes.bool,
  isNewUser: PropTypes.bool,
  loadPlaybackInfo: PropTypes.func.isRequired,
  loadProfile: PropTypes.func.isRequired,
  redirectUri: PropTypes.string.isRequired,
  store: PropTypes.object.isRequired,
};

const mapStateToProps = ({ user: { auth: { token, expiry } } }) => ({
  isNewUser: !token && !expiry,
  isAuthenticated: typeof token !== 'undefined' && (Date.now() - (new Date(expiry)).getTime()) <= 0,
});

const mapDispatchToProps = dispatch => ({
  loadProfile: () => dispatch(loadProfile()),
  loadPlaybackInfo: () => dispatch(loadPlaybackInfo()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
