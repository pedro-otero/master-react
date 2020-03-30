import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import ArtistWork from 'components/ArtistWork';
import { Block } from 'components/Utils';
import Image from 'components/Image';
import { ViewContext } from 'components/View';
import LoadingCircle from 'components/LoadingCircle';
import GlobalAppContext from '../../context';
import DataContext from '../../data-context';
import Progress from '../progress/progress';
import { artistToState, groupAlbums } from '../../data/artists';
import { getItems } from '../../data/library';

const AlbumItem = styled.div`
  display: flex;
  margin-bottom: 1em;
  
  :hover {
    filter: brightness(130%);
  }
`;

const AlbumInfo = styled.div`
  margin-left: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export function Artist({ id }) {
  const {
    spotifyApi,
  } = React.useContext(GlobalAppContext);
  const { setIsError } = React.useContext(ViewContext);
  const { profile } = React.useContext(DataContext);

  const [artist, setArtist] = useState();
  const [albums, setAlbums] = React.useState({
    next: { offset: 0, limit: 20 },
    items: [],
    progress: { display: false },
  });

  useEffect(() => {
    spotifyApi.getArtist(id)
      .then(response => setArtist(artistToState(response.body)))
      .catch(() => setIsError(true));
  }, [id, setIsError, spotifyApi]);

  React.useEffect(() => {
    if (profile.country && id && albums.next) {
      spotifyApi.getArtistAlbums(id, albums.next).then((response) => {
        setAlbums(getItems(albums, {
          body: {
            ...response.body,
            items: response.body.items
              .filter(item => item.available_markets.includes(profile.country)),
          },
        }));
      });
    }
  }, [albums.next, albums.items, spotifyApi, id, profile.country, albums]);

  const albumGroups = groupAlbums(albums.items);

  return (
    <Fragment>
      {!artist && <LoadingCircle message="Loading..." />}
      {artist && <Fragment>
        {albums.progress.display && <Progress value={albums.progress.value} size="small" />}
        <ArtistWork title={artist.name} image={artist.image} background={artist.image} />
        <Block>
          {albumGroups.map(category => (
            <Fragment key={category.name}>
              <h3>{category.name} ({category.items.length})</h3>
              <hr />
              {category.items.map(album => (
                <Link to={`/album/${album.id}`} key={album.id}>
                  <AlbumItem>
                    <Image src={album.image} size="4em" />
                    <AlbumInfo>
                      <div>{album.name}</div>
                      <div>{album.year}</div>
                    </AlbumInfo>
                  </AlbumItem>
                </Link>
            ))}
              <br />
            </Fragment>
        ))}
        </Block>
      </Fragment>}
    </Fragment>
  );
}

Artist.propTypes = {
  id: PropTypes.string,
};

export default Artist;
