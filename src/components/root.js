import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import styled from 'styled-components';

import Welcome from 'components/Welcome';
import Errors from 'components/Errors';
import TrackContainer from 'components/TrackContainer';
import AlbumContainer from 'components/AlbumContainer';
import Home from 'components/Home';
import Drawer from 'components/Drawer';
import Menu from 'components/Menu';
import SavedTracks from 'components/SavedTracks';
import SavedAlbums from 'components/SavedAlbums';
import { loadProfile } from 'state/profile';
import { loadPlaybackInfo } from 'state/playbackInfo';
import Artist from 'components/Artist';
import { endSwipe, setTouch, closeMenu } from 'state/swipe';

const ContentArea = styled.div`
  flex: 1;
  overflow: auto;
  
  @media (min-width: 769px) {
    display: flex;
    flex-direction: row;
  }
`;

const Main = styled.span`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
`;

const Views = styled.div`
  position: relative;
  bottom: 0;
  overflow: auto;
  
  @media (min-width: 769px) {
    flex: 1;
    border-left: 1px grey solid;
  }
`;

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

  getMainContainerClickHandler = () => {
    if (window.matchMedia('(min-width: 769px)').matches) {
      return null;
    }
    return this.props.closeMenu;
  };

  render() {
    const {
      isNewUser, isAuthenticated, store, open,
    } = this.props;
    if (isNewUser) {
      return <Welcome loginUrl={this.getAuthUrl()} />;
    } else if (!isAuthenticated) {
      window.location = this.getAuthUrl();
      return null;
    }
    const isDesktop = window.matchMedia('(min-width: 769px)').matches;
    const isMenuVisible = isDesktop ? true : open === 100;
    return <Provider store={store}>
      <Router>
        <Main onClick={this.getMainContainerClickHandler()}>
          <Drawer
              open={open}
              bgColor="#222222"
              opacity={0.95}>
            <Menu isVisible={isMenuVisible} />
          </Drawer>
          <ContentArea
              onTouchStart={this.props.setTouch}
              onTouchMove={this.props.setTouch}
              onTouchEnd={this.props.endSwipe}>
            <Errors />
            <Views>
              <Route exact path="/" component={Home} />
              <Route path="/track/:id" render={({ match }) => <TrackContainer trackId={match.params.id} />} />
              <Route path="/album/:id" render={({ match }) => <AlbumContainer albumId={match.params.id} />} />
              <Route path="/artist/:id" render={({ match }) => <Artist id={match.params.id} />} />
              <Route path="/user/tracks" render={() => <SavedTracks />} />
              <Route path="/user/albums" render={() => <SavedAlbums />} />
            </Views>
          </ContentArea>
        </Main>
      </Router>
    </Provider>;
  }
}

Root.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  endSwipe: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isNewUser: PropTypes.bool,
  loadPlaybackInfo: PropTypes.func.isRequired,
  loadProfile: PropTypes.func.isRequired,
  open: PropTypes.number.isRequired,
  redirectUri: PropTypes.string.isRequired,
  setTouch: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired,
};

const mapStateToProps = ({ user: { auth: { token, expiry } }, swipe: { open } }) => ({
  isNewUser: !token && !expiry,
  isAuthenticated: typeof token !== 'undefined' && (Date.now() - (new Date(expiry)).getTime()) <= 0,
  open,
});

const mapDispatchToProps = dispatch => ({
  loadProfile: () => dispatch(loadProfile()),
  loadPlaybackInfo: () => dispatch(loadPlaybackInfo()),
  setTouch: event => dispatch(setTouch(event)),
  endSwipe: () => dispatch(endSwipe()),
  closeMenu: () => dispatch(closeMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
