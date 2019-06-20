import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SavedTrackItem from 'components/SavedTrackItem';
import { loadSavedTracks } from 'state/library';
import { clearErrors } from 'state/errors';
import NoItems from 'components/NoItems';
import { bindActionCreators } from 'redux';

export class SavedTracks extends React.Component {
  componentDidMount() {
    this.props.clearErrors();
    this.props.loadSavedTracks();
  }

  componentDidUpdate(prev) {
    if (this.props.nextPage && prev.nextPage.offset !== this.props.nextPage.offset) {
      this.props.loadSavedTracks();
    }
  }

  getSavedTrackListItem = ({
    id, name, artist, album,
  }) => <SavedTrackItem
      key={id}
      id={id}
      name={name}
      artist={artist}
      album={album} />;

  render() {
    return (
      <Fragment>
        {this.props.tracks.map(this.getSavedTrackListItem)}
        {!this.props.tracks.length && <NoItems />}
      </Fragment>
    );
  }
}

SavedTracks.propTypes = {
  clearErrors: PropTypes.func,
  loadSavedTracks: PropTypes.func,
  nextPage: PropTypes.object,
  tracks: PropTypes.arrayOf(PropTypes.shape({
    album: PropTypes.string,
    artist: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  })),
};

export const mapStateToProps = ({
  user: { library: { tracks: { items, nextPage } } },
  search: { value },
}) => ({
  tracks: Object.values(items)
    .filter(track => !value
      || track.name.toUpperCase().includes(value.toUpperCase())
      || track.album.toUpperCase().includes(value.toUpperCase())
      || track.artist.toUpperCase().includes(value.toUpperCase())),
  nextPage,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadSavedTracks,
  clearErrors,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SavedTracks);
