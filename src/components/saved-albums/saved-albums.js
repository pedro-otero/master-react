import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SavedAlbumItem from 'components/SavedAlbumItem';
import List from 'components/List';
import { loadSavedAlbums } from 'state/library';
import View from 'components/View';
import { clearErrors } from 'state/errors';

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
    const {
      albums,
      loadSavedAlbums,
      clearErrors,
      canLoadMore,
    } = this.props;
    return (
      <View
          clearErrors={clearErrors}
          canStartLoadingDetails={() => true}
          shouldStopSearching={() => canLoadMore}
          load={() => {}}
          loadSearchResult={loadSavedAlbums}>
        <List searchFields={['name', 'artist']}>
          {albums.map(this.getSavedAlbumListItem)}
        </List>
      </View>
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
  user: { library: { albums: { items, nextPage } } },
}) => ({
  albums: Object.values(items),
  canLoadMore: nextPage !== null,
});

const mapDispatchToProps = dispatch => ({
  loadSavedAlbums: () => dispatch(loadSavedAlbums()),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedAlbums);
