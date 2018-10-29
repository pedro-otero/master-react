import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SavedTrackItem from 'components/SavedTrackItem';
import List from 'components/List';
import { loadSavedTracks } from 'state/library';

export class SavedTracks extends React.Component {
  componentDidMount() {
    this.props.loadSavedTracks();
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
    const { tracks, loadSavedTracks } = this.props;
    return (
      <div>
        <List
            searchFields={['name', 'artist', 'album']}
            onBottomReached={loadSavedTracks}>
          {tracks.map(this.getSavedTrackListItem)}
        </List>
      </div>
    );
  }
}

SavedTracks.propTypes = {
  loadSavedTracks: PropTypes.func,
  tracks: PropTypes.arrayOf(PropTypes.shape({
    album: PropTypes.string,
    artist: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
  })),
};

export const mapStateToProps = ({
  user: { library: { tracks: { items } } },
}) => ({
  tracks: Object.values(items),
});

const mapDispatchToProps = dispatch => ({
  loadSavedTracks: () => dispatch(loadSavedTracks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedTracks);
