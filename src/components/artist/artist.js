import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ArtistWork from 'components/ArtistWork';
import Link from 'components/Link';
import { Block } from 'components/Utils';
import Image from 'components/Image';
import * as viewActions from 'state/view';
import * as artistsActions from 'state/artists';
import View from 'components/View';
import * as errorsActions from 'state/errors';

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

export class Artist extends React.Component {
  render() {
    const {
      name, image, albums, id, loadArtistAlbums, canLoadMoreAlbums, viewArtist, clearErrors,
    } = this.props;
    return (
      <View
          clearErrors={clearErrors}
          canStartLoadingDetails={() => true}
          shouldStopSearching={() => !canLoadMoreAlbums}
          load={() => viewArtist(id)}
          loadSearchResult={() => loadArtistAlbums(id)}>
        <ArtistWork title={name} image={image} background={image} />
        <Block>
          {albums.map(category => (
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
      </View>
    );
  }
}

Artist.propTypes = {
  albums: PropTypes.array,
  canLoadMoreAlbums: PropTypes.bool,
  clearErrors: PropTypes.func,
  id: PropTypes.string,
  image: PropTypes.string,
  loadArtistAlbums: PropTypes.func,
  name: PropTypes.string,
  viewArtist: PropTypes.func,
};

const mapStateToProps = ({ artists }, { id }) => {
  let artist = {};
  if (artists[id]) {
    artist = artists[id];
  }
  const {
    name, image, albums: { items: albums = [], nextPage } = {},
  } = artist;
  const canLoadMoreAlbums = nextPage !== null;
  return {
    id, name, image, albums, canLoadMoreAlbums,
  };
};

const mapDispatchToProps = dispatch => ({
  viewArtist: id => dispatch(viewActions.viewArtist(id)),
  loadArtistAlbums: id => dispatch(artistsActions.loadArtistAlbums(id)),
  clearErrors: () => dispatch(errorsActions.clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
