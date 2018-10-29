import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SavedAlbumItem from 'components/SavedAlbumItem';
import List from 'components/List';
import { loadSavedAlbums } from 'state/library';

export class SavedAlbums extends React.Component {
  componentDidMount() {
    this.props.loadSavedAlbums();
  }

  getSavedAlbumListItem = ({
    id, name, artist,
  }) => <SavedAlbumItem
      key={id}
      id={id}
      name={name}
      artist={artist} />;

  render() {
    const { albums, loadSavedAlbums } = this.props;
    return (
      <div>
        <List
            searchFields={['name', 'artist']}
            onBottomReached={loadSavedAlbums}>
          {albums.map(this.getSavedAlbumListItem)}
        </List>
      </div>
    );
  }
}

SavedAlbums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape({
    artist: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  loadSavedAlbums: PropTypes.func,
};

export const mapStateToProps = ({
  user: { library: { albums: { items } } },
}) => ({
  albums: Object.values(items),
});

const mapDispatchToProps = dispatch => ({
  loadSavedAlbums: () => dispatch(loadSavedAlbums()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedAlbums);
