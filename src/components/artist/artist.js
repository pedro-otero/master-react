import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ArtistWork from 'components/ArtistWork';
import LoadingCircle from 'components/LoadingCircle';
import Link from 'components/Link';
import { Block } from 'components/Utils';
import Image from 'components/Image';
import { viewArtist } from 'state/view';

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
  componentDidMount() {
    this.props.viewArtist(this.props.id);
  }

  render() {
    const {
      name, image, loading, failed, albums,
    } = this.props;
    if (loading) {
      return <LoadingCircle message="Loading data from Spotify..." />;
    }
    if (failed) {
      return <div>
        <i className="em em--1"></i>
        <h1>Could not load this artist</h1>
      </div>;
    }
    return (<Fragment>
      <ArtistWork title={name} image={image} background={image} />
      <Block>
        {albums && albums.length && albums.map(album => (
          <Link to={`/album/${album.id}`}>
            <AlbumItem>
              <Image src={album.image} size="4em" />
              <AlbumInfo>
                <div>{album.name}</div>
                <div>{album.year}</div>
              </AlbumInfo>
            </AlbumItem>
          </Link>
        ))}
      </Block>
    </Fragment>
    );
  }
}

Artist.propTypes = {
  albums: PropTypes.array,
  failed: PropTypes.bool,
  id: PropTypes.string,
  image: PropTypes.string,
  loading: PropTypes.bool,
  name: PropTypes.string,
  viewArtist: PropTypes.func,
};

const mapStateToProps = ({ artists }, { id }) => {
  let artist = {};
  if (artists[id]) {
    artist = artists[id];
  }
  const {
    name, image, albums: { items: albums = [] } = {}, loading, failed,
  } = artist;
  return {
    id, name, image, albums, loading, failed,
  };
};

const mapDispatchToProps = dispatch => ({
  viewArtist: id => dispatch(viewArtist(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Artist);
