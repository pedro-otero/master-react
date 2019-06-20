import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SavedAlbumItem from 'components/SavedAlbumItem';
import { loadSavedAlbums } from 'state/library';
import { clearErrors } from 'state/errors';
import NoItems from 'components/NoItems';
import { bindActionCreators } from 'redux';

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
      <Fragment>
        {this.props.albums.map(this.getSavedAlbumListItem)}
        {!this.props.albums.length && <NoItems />}
      </Fragment>
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
  search: { value },
}) => ({
  albums: Object.values(items)
    .filter(album => !value
      || album.name.toUpperCase().includes(value.toUpperCase())
      || album.artist.toUpperCase().includes(value.toUpperCase())),
  nextPage,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadSavedAlbums,
  clearErrors,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SavedAlbums);
