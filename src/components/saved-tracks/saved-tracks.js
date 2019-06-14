import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SavedTrackItem from 'components/SavedTrackItem';
import List from 'components/List';
import { loadSavedTracks } from 'state/library';
import { clearErrors } from 'state/errors';

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
      <List searchFields={['name', 'artist', 'album']}>
        {this.props.tracks.map(this.getSavedTrackListItem)}
      </List>
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
}) => ({
  tracks: Object.values(items),
  nextPage,
});

const mapDispatchToProps = dispatch => ({
  loadSavedTracks: () => dispatch(loadSavedTracks()),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedTracks);
