import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Errors from 'components/Errors';
import TrackDetails from 'components/TrackDetails';
import Album from 'components/Album';
import Home from 'components/Home';
import Drawer from 'components/Drawer';
import Menu from 'components/Menu';
import SavedTracks from 'components/SavedTracks';
import SavedAlbums from 'components/SavedAlbums';
import Artist from 'components/Artist';
import Filter from 'components/Filter';
import View from 'components/View';
import GlobalAppContext from '../context';
import DataContext from '../data-context';

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

const useSwipeMenu = () => {
  const [state, setState] = React.useState({ open: 0 });

  const setTouch = React.useCallback((event) => {
    const x = event.touches.item(0).clientX;
    const third = event.currentTarget.offsetWidth / 3;
    if (!state.firstX) {
      setState({
        open: 0,
        firstX: x,
      });
      return;
    }
    const open = (100 * (x - state.firstX)) / third;
    setState({
      open,
      firstX: state.firstX,
    });
  }, [state.firstX]);
  const endSwipe = React.useCallback(() => {
    setState({ open: state.open > 60 ? 100 : 0 });
  }, [state.open]);
  const closeMenu = React.useCallback(() => setState({ open: 0 }), []);

  return {
    open: state.open,
    closeMenu,
    endSwipe,
    setTouch,
  };
};

const useProfile = () => {
  const {
    spotifyApi,
  } = React.useContext(GlobalAppContext);

  const [profile, setProfile] = React.useState({ isLoaded: false });

  React.useEffect(() => {
    spotifyApi.getMe().then((response) => {
      setProfile({
        userId: response.body.id,
        name: response.body.display_name,
        avatar: response.body.images[0].url,
        country: response.body.country,
        isLoaded: true,
      });
    });
  }, [spotifyApi]);

  return profile;
};

const useFilter = () => {
  const [{
    filter,
  }, setContextValue] = React.useState({
    filter: '',
  });

  const setFilter = value => setContextValue({
    filter: value,
  });

  return [filter, setFilter];
};

const useErrors = () => {
  const [list, setErrors] = React.useState([]);
  const add = React.useCallback(value => setErrors([...list, value]), [list]);
  const clear = React.useCallback(() => setErrors([]), []);

  return { list, add, clear };
};

export function Root() {
  const [filter, setFilter] = useFilter();
  const profile = useProfile();
  const {
    open, closeMenu, endSwipe, setTouch,
  } = useSwipeMenu();
  const errors = useErrors();

  const getMainContainerClickHandler = () => {
    if (window.matchMedia('(min-width: 769px)').matches) {
      return null;
    }
    return closeMenu;
  };

  const isDesktop = window.matchMedia('(min-width: 769px)').matches;
  const isMenuVisible = isDesktop ? true : open === 100;
  return (
    <DataContext.Provider value={{
 filter, setFilter, errors, profile,
}}>
      <Main onClick={getMainContainerClickHandler()}>
        {isDesktop && <Menu
            isVisible
            loading={!profile.isLoaded}
            name={profile.name}
            userId={profile.userId}
            avatar={profile.avatar} />}
        {!isDesktop && <Drawer
            open={open === 100}
            bgColor="#222222"
            width="300px"
            opacity={0.95}>
          <Menu
              isVisible={isMenuVisible}
              loading={!profile.isLoaded}
              name={profile.name}
              userId={profile.userId}
              avatar={profile.avatar} />
        </Drawer>}
        <ContentArea
            onTouchStart={setTouch}
            onTouchMove={setTouch}
            onTouchEnd={endSwipe}>
          <Errors list={errors.list} />
          <Views>
            <Route exact path="/" component={() => <Home loading={!profile.isLoaded} name={profile.name} userId={profile.userId} />} />
            <Route
                path="/track/:id"
                render={({ match }) => (
                  <View failureMessage="Could not load this track">
                    <TrackDetails trackId={match.params.id} />
                  </View>
                )} />
            <Route
                path="/album/:id"
                render={({ match }) => (
                  <View failureMessage="Could not load this album">
                    <Album albumId={match.params.id} />
                  </View>
                )} />
            <Route
                path="/artist/:id"
                render={({ match }) => (
                  <View failureMessage="Could not load this artist">
                    <Artist id={match.params.id} />
                  </View>
                )} />
            <Route path="/user" render={() => <Filter value={filter} onChange={setFilter} />} />
            <Route path="/user/tracks" render={() => <SavedTracks />} />
            <Route path="/user/albums" render={() => <SavedAlbums />} />
          </Views>
        </ContentArea>
      </Main>
    </DataContext.Provider>
  );
}

export default withRouter(Root);
