import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SavedTrackItem from 'components/SavedTrackItem';
import List from 'components/List';
import { loadSavedTracks } from 'state/library';
import View from 'components/View';
import { clearErrors } from 'state/errors';

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
    const {
      tracks,
      loadSavedTracks,
      clearErrors,
      canLoadMore,
    } = this.props;
    return (
      <View
          clearErrors={clearErrors}
          canStartLoadingDetails={() => true}
          shouldStopSearching={() => canLoadMore}
          load={() => {}}
          loadSearchResult={loadSavedTracks}>
        <List searchFields={['name', 'artist', 'album']}>
          {tracks.map(this.getSavedTrackListItem)}
        </List>
      </View>
    );
  }
}

SavedTracks.propTypes = {
  canLoadMore: PropTypes.bool,
  clearErrors: PropTypes.func,
  loadSavedTracks: PropTypes.func,
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
  canLoadMore: nextPage !== null,
});

const mapDispatchToProps = dispatch => ({
  loadSavedTracks: () => dispatch(loadSavedTracks()),
  clearErrors: () => dispatch(clearErrors()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SavedTracks);
