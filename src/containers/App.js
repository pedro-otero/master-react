import * as React from 'react';
import PropTypes from 'prop-types';

import Song from '../components/song';

export default class App extends React.Component {
  componentDidMount() {
    this.getPlaybackData();
  }

  componentWillUnmount() {
    this.creditsObservable.unsubscribe();
  }

  getPlaybackData() {
    this.props.spotifyApi.getCurrentPlayback().then(({ body: playback }) => {
      this.setState({ track: playback.item });
      this.getAlbum(playback.item.album.id);
      this.getArtist(playback.item.artists[0].id);
    });
  }

  getAlbum(id) {
    this.props.spotifyApi.getAlbum(id).then(({ body: album }) => {
      this.setState({ album }, this.getCredits);
    });
  }

  getArtist(id) {
    this.props.spotifyApi.getArtist(id).then(({ body: artist }) => {
      this.setState({ artist });
    });
  }

  getCredits() {
    this.creditsObservable = this.props.backend.getCredits(this.state.album.id)
      .subscribe(({ bestMatch: { tracks }, progress }) => {
        const trackBestMatch = tracks.find(t => t.id === this.state.track.id);
        this.setState({ bestMatch: trackBestMatch, progress });
      });
  }

  render() {
    return (
      <Song {...this.state} />
    );
  }
}

App.propTypes = {
  backend: PropTypes.func.isRequired,
  spotifyApi: PropTypes.func.isRequired,
};
