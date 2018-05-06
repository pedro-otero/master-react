import * as React from 'react';
import PropTypes from 'prop-types';

import Song from '../components/song/song';

export default class App extends React.Component {
  componentDidMount() {
    this.getPlaybackData();
  }

  componentWillUnmount() {
    this.timer = null;
  }

  getPlaybackData() {
    this.props.spotifyApi.getCurrentPlayback().then(({ body: playback }) => {
      this.setState({ track: playback.item });
      this.props.spotifyApi.getAlbum(playback.item.album.id).then(({ body: album }) => {
        this.setState({ album }, this.getCredits);
      });
      this.props.spotifyApi.getArtist(playback.item.artists[0].id).then(({ body: artist }) => {
        this.setState({ artist });
      });
    });
  }

  getCredits() {
    this.props.backend.getCredits(this.state.album.id)
      .then(({ bestMatch: { tracks }, progress }) => {
        const trackBestMatch = tracks.find(t => t.id === this.state.track.id);
        this.setState({ bestMatch: trackBestMatch, progress });
        if (progress < 100) {
          this.timer = setImmediate(this.getCredits.bind(this), 1000);
        }
      });
  }

  render() {
    return (
      <Song {...this.state} />
    );
  }
}

App.propTypes = {
  spotifyApi: PropTypes.func.isRequired,
  backend: PropTypes.func.isRequired,
};
