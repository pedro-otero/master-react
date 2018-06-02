import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Song from '../components/song';
import './App.css';
import EmptyPlayback from '../components/empty-playback';
import generateCreator from '../redux/actions/generate-creator';

const setSearchResult = generateCreator('SET_SEARCH_RESULT');

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.addError = this.addError.bind(this);
    this.state = { errors: [], playback: true };
  }

  componentDidMount() {
    this.getPlaybackData();
  }

  componentWillUnmount() {
    if (this.creditsObservable) {
      this.creditsObservable.unsubscribe();
    }
  }

  getPlaybackData() {
    this.props.spotifyApi.getCurrentPlayback().then(({ body }) => {
      if (body) {
        const { item: track } = body;
        this.setState({
          track,
          playback: true,
        });
        this.getAlbum(track.album.id);
        this.getArtist(track.artists[0].id);
      } else {
        this.setState({ playback: false });
      }
    }, this.addError).catch(this.addError);
  }

  getAlbum(id) {
    this.props.spotifyApi.getAlbum(id).then(({ body: album }) => {
      this.setState({ album }, this.getCredits);
    }, this.addError).catch(this.addError);
  }

  getArtist(id) {
    this.props.spotifyApi.getArtist(id).then(({ body: artist }) => {
      this.setState({ artist });
    }, this.addError).catch(this.addError);
  }

  getCredits() {
    this.creditsObservable = this.props.backend.getCredits(this.state.album.id)
      .subscribe((response) => {
        this.props.setSearchResult(response.id, response);
        this.setState({
          progress: response.progress,
        });
      }, this.addError);
  }

  addError({ message }) {
    this.setState({
      errors: [...this.state.errors, message],
    });
  }

  getBestMatch() {
    const { track, album } = this.state;
    const { searches } = this.props;
    if (track && album && searches[album.id]) {
      const albumBestMatch = searches[album.id].bestMatch;
      return albumBestMatch.tracks.find(t => t.id === track.id);
    }
    return null;
  }

  render() {
    const {
      track, album, artist, progress, errors, playback,
    } = this.state;
    const bestMatch = this.getBestMatch();
    return (
      <div>
        {errors.length > 0 &&
        <div className="errors-div">
          {errors.map((error, i) => <p key={`error-${i}`}>{error}</p>)}
          <p>Please reload the page to try again</p>
        </div>}
        {!playback && <EmptyPlayback />}
        {playback && <Song
            track={track}
            album={album}
            artist={artist}
            bestMatch={bestMatch}
            progress={progress} />}
      </div>
    );
  }
}

const mapStateToProps = ({ searches }) => ({ searches });

const mapDispatchToProps = dispatch => ({
  setSearchResult: (id, search) => dispatch(setSearchResult(id, search)),
});

App.propTypes = {
  backend: PropTypes.func.isRequired,
  searches: PropTypes.object.isRequired,
  setSearchResult: PropTypes.func.isRequired,
  spotifyApi: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
