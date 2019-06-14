import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SavedAlbumItem from 'components/SavedAlbumItem';
import List from 'components/List';
import { loadSavedAlbums } from 'state/library';
import { clearErrors } from 'state/errors';

export class SavedAlbums extends React.Component {
  componentDidMount() {
    this.props.clearErrors();
    this.props.loadSavedAlbums();
  }

  componentDidUpdate(prev) {
    if (this.props.nextPage && prev.nextPage.offset !== this.props.nextPage.offset) {
      this.props.loadSavedAlbums();
    }
  }

  getSavedAlbumListItem = ({
    id, name, artist,
  }) => <SavedAlbumItem
      key={id}
      id={id}
      name={name}
      artist={artist} />;

  render() {
    return (
      <List searchFields={['name', 'artist']}>
        {this.props.albums.map(this.getSavedAlbumListItem)}
      </List>
    );
  }
}

SavedAlbums.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape({
    artist: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  })),
  clearErrors: PropTypes.func,
  loadSavedAlbums: PropTypes.func,
  nextPage: PropTypes.object,
};

export const mapStateToProps = ({
  user: { library: { albums: { items, nextPage } } },
}) => ({
  albums: Object.values(items),
  nextPage,
});

const mapDispatchToProps = dispatch => ({
  loadSavedAlbums: () => dispatch(loadSavedAlbums()),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedAlbums);
