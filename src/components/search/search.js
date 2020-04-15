import React, { Fragment, useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import Filter from 'components/Filter';
import Image from 'components/Image';
import ListItem from 'components/ListItem';
import { Block } from 'components/Utils';
import LoadingCircle from 'components/LoadingCircle';
import GlobalAppContext from '../../context';
import getFirstImageUrl from '../../data/get-first-image-url';
import { trackToState } from '../../data/tracks';
import { albumToState } from '../../data/albums';
import { artistToState } from '../../data/artists';

const ExpandSearch = styled(Link)`
  display: flex;
  align-items: center;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`;

const Result = ({
  path, name, additional, image,
}) => (
  <Link to={path}>
    <Item>
      <Image
          xs="2em"
          sm="3em"
          md="3em"
          lg="4em"
          xl="4em"
          src={image} />
      <ListItem
          path={path}
          name={name}
          additional={additional} />
    </Item>
  </Link>
);

Result.propTypes = {
  additional: PropTypes.string,
  image: PropTypes.string,
  name: PropTypes.string,
  path: PropTypes.string,
};

export function Search({
  type = 'album,track,artist,playlist', limit, history, location,
}) {
  const {
    spotify,
  } = React.useContext(GlobalAppContext);

  const [query, setQuery] = useState(new URLSearchParams(location.search).get('q'));
  const [results, setResults] = useState({
    tracks: [],
    albums: [],
    playlists: [],
    artists: [],
  });
  const [timer, setTimer] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const search = useCallback(term => () => {
    setIsLoading(true);
    spotify.get('/search', {
      params: {
        q: term,
        type,
        market: 'from_token',
        limit,
      },
    })
      .then((response) => {
        history.replace({
          search: `?q=${query}`,
        });
        const {
          tracks = { items: [] },
          albums = { items: [] },
          artists = { items: [] },
          playlists = { items: [] },
        } = response.data;
        setIsLoading(false);
        setResults({
          tracks: tracks.items.map(trackToState),
          albums: albums.items.map(albumToState),
          artists: artists.items.map(artistToState),
          playlists: playlists.items.map(playlist => ({
            key: playlist.id,
            path: `/playlist/${playlist.id}`,
            image: getFirstImageUrl(playlist.images),
            name: playlist.name,
            tracks: playlist.tracks.total,
          })),
        });
      });
  }, [history, limit, query, spotify, type]);

  useEffect(() => {
    if (query) {
      setTimer(setTimeout(search(query), 500));
    }
  }, [query, search]);

  const programSearch = useCallback((term) => {
    clearTimeout(timer);
    setQuery(term);
  }, [timer]);

  if (isLoading) {
    return <LoadingCircle message="Searching..." />;
  }
  return (
    <Fragment>
      <Filter value={query} onChange={programSearch} />
      <Block>
        {results.tracks.length > 0 && <Fragment>
          <ExpandSearch to={`/search/track?q=${query}`}>
            <h3>Tracks</h3>
            <span className="em em-arrow_right"></span>
          </ExpandSearch>
          <hr />
          {results.tracks.map(track => (
            <Result
                key={track.id}
                path={`/track/${track.id}`}
                name={track.name}
                additional={track.artist}
                image={track.image} />
        ))}
          <hr />
        </Fragment>}
        {results.albums.length > 0 && <Fragment>
          <ExpandSearch to={`/search/album?q=${query}`}>
            <h3>Albums</h3>
            <span className="em em-arrow_right"></span>
          </ExpandSearch>
          <hr />
          {results.albums.map(album => (
            <Result
                key={album.id}
                path={`/album/${album.id}`}
                name={album.name}
                additional={album.artist}
                image={album.image} />
        ))}
          <hr />
        </Fragment>}
        {results.artists.length > 0 && <Fragment>
          <ExpandSearch to={`/search/artist?q=${query}`}>
            <h3>Artists</h3>
            <span className="em em-arrow_right"></span>
          </ExpandSearch>
          <hr />
          {results.artists.map(artist => (
            <Result
                key={artist.id}
                path={`/artist/${artist.id}`}
                name={artist.name}
                image={artist.image} />
        ))}
          <hr />
        </Fragment>}
        {results.playlists.length > 0 && <Fragment>
          <ExpandSearch to={`/search/playlist?q=${query}`}>
            <h3>Playlists</h3>
            <span className="em em-arrow_right"></span>
          </ExpandSearch>
          <hr />
          {results.playlists.map(playlist => (
            <Result
                key={playlist.key}
                path={playlist.path}
                name={playlist.name}
                additional={`${playlist.tracks} tracks`}
                image={playlist.image} />
        ))}
          <hr />
        </Fragment>}
      </Block>
    </Fragment>
  );
}

Search.propTypes = {
  history: PropTypes.object,
  limit: PropTypes.number,
  location: PropTypes.object,
  type: PropTypes.string,
};

export default withRouter(Search);
