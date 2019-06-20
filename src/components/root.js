import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Welcome from 'components/Welcome';
import Errors from 'components/Errors';
import TrackDetails from 'components/TrackDetails';
import Album from 'components/Album';
import Home from 'components/Home';
import Drawer from 'components/Drawer';
import Menu from 'components/Menu';
import SavedTracks from 'components/SavedTracks';
import SavedAlbums from 'components/SavedAlbums';
import { loadProfile } from 'state/profile';
import Artist from 'components/Artist';
import { endSwipe, setTouch, closeMenu } from 'state/swipe';
import Progress from 'components/Progress';
import LoadingCircle from 'components/LoadingCircle';
import * as searchActions from 'state/actions/backend';
import * as filterActions from 'state/search';
import Filter from 'components/Filter';
import { bindActionCreators } from 'redux';

const ContentArea = styled.div`
  flex: 1;
  overflow: auto;
  
  @media (min-width: 769px) {
    display: flex;
    flex-direction: column;
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

  componentDidUpdate(prev) {
    const {
      loadSearchResult,
      progress: { available: isSearching },
      viewing: albumInView,
    } = this.props;
    if (albumInView) {
      if (!prev.viewing) {
        loadSearchResult(albumInView);
      } else if (isSearching) {
        setTimeout(loadSearchResult, 1000, albumInView);
      }
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
      isNewUser, isAuthenticated, open, progress,
    } = this.props;
    if (isNewUser) {
      return <Welcome loginUrl={this.getAuthUrl()} />;
    } else if (!isAuthenticated) {
      window.location = this.getAuthUrl();
      return null;
    }
    const isDesktop = window.matchMedia('(min-width: 769px)').matches;
    const isMenuVisible = isDesktop ? true : open === 100;
    return (
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
            {progress.available && <Progress value={progress.value} size="small" />}
            <Route exact path="/" component={Home} />
            <Route path="/track/:id" render={({ match }) => <TrackDetails trackId={match.params.id} />} />
            <Route path="/album/:id" render={({ match }) => <Album albumId={match.params.id} />} />
            <Route path="/artist/:id" render={({ match }) => <Artist id={match.params.id} />} />
            <Route path="/user" render={() => <Filter value={this.props.filter} onChange={this.props.onChangeFilter} />} />
            <Route path="/user/tracks" render={() => <SavedTracks />} />
            <Route path="/user/albums" render={() => <SavedAlbums />} />
            {progress.loading && <LoadingCircle message={progress.loading} />}
          </Views>
        </ContentArea>
      </Main>
    );
  }
}

Root.propTypes = {
  closeMenu: PropTypes.func.isRequired,
  endSwipe: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool,
  isNewUser: PropTypes.bool,
  loadProfile: PropTypes.func.isRequired,
  loadSearchResult: PropTypes.func.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
  open: PropTypes.number.isRequired,
  progress: PropTypes.shape({
    available: PropTypes.bool,
    value: PropTypes.number,
    loading: PropTypes.string,
  }),
  redirectUri: PropTypes.string.isRequired,
  setTouch: PropTypes.func.isRequired,
  viewing: PropTypes.string,
};

const mapStateToProps = ({
  user: { auth: { token, expiry } },
  swipe: { open },
  progress,
  viewing,
  search: { value: filter },
}) => ({
  isNewUser: !token && !expiry,
  isAuthenticated: typeof token !== 'undefined' && (Date.now() - (new Date(expiry)).getTime()) <= 0,
  open,
  progress,
  viewing,
  filter,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadProfile,
  setTouch,
  endSwipe,
  closeMenu,
  onChangeFilter: filterActions.setValue,
  loadSearchResult: searchActions.loadSearchResult,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Root));
