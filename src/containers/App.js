import * as React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Song from '../components/song';
import './App.css';
import EmptyPlayback from '../components/empty-playback';
import generateCreator from '../redux/actions/generate-creator';
import setPlaybackInfo from '../redux/actions/set-playback-info';

const setSearchResult = generateCreator('SET_SEARCH_RESULT');
const setAlbum = generateCreator('SET_ALBUM');
const setArtist = generateCreator('SET_ARTIST');

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.addError = this.addError.bind(this);
    this.state = { errors: [] };
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
      if (body && body.item) {
        this.props.setPlaybackInfo(body);
        this.getAlbum(body.item.album.id);
        this.getArtist(body.item.artists[0].id);
      } else {
        setPlaybackInfo(null);
      }
    }, this.addError).catch(this.addError);
  }

  getAlbum(id) {
    this.props.spotifyApi.getAlbum(id).then(({ body: album }) => {
      this.props.setAlbum(id, album);
      this.getCredits();
    }, this.addError).catch(this.addError);
  }

  getArtist(id) {
    this.props.spotifyApi.getArtist(id).then(({ body: artist }) => {
      this.props.setArtist(id, artist);
    }, this.addError).catch(this.addError);
  }

  getCredits() {
    const album = this.selectAlbum();
    this.creditsObservable = this.props.backend.getCredits(album.id)
      .subscribe((response) => {
        this.props.setSearchResult(response.id, response);
      }, this.addError);
  }

  addError({ message }) {
    this.setState({
      errors: [...this.state.errors, message],
    });
  }

  selectSearch() {
    const album = this.selectAlbum();
    const { searches, playbackInfo } = this.props;
    if (playbackInfo && playbackInfo.item && album && searches[album.id]) {
      return searches[album.id];
    }
    return null;
  }

  getBestMatch() {
    const { playbackInfo } = this.props;
    const search = this.selectSearch();
    if (search && playbackInfo && playbackInfo.item) {
      const albumBestMatch = search.bestMatch;
      return albumBestMatch.tracks.find(t => t.id === playbackInfo.item.id);
    }
    return null;
  }

  selectAlbum() {
    const { albums, playbackInfo } = this.props;
    if (playbackInfo && playbackInfo.item && albums[playbackInfo.item.album.id]) {
      return albums[playbackInfo.item.album.id];
    }
    return null;
  }

  selectArtist() {
    const { artists, playbackInfo } = this.props;
    if (playbackInfo && playbackInfo.item) {
      return artists[playbackInfo.item.artists[0].id];
    }
    return null;
  }

  render() {
    const {
      errors,
    } = this.state;
    const bestMatch = this.getBestMatch();
    const search = this.selectSearch();
    const album = this.selectAlbum();
    const artist = this.selectArtist();
    return (
      <div>
        {errors.length > 0 &&
        <div className="errors-div">
          {errors.map((error, i) => <p key={`error-${i}`}>{error}</p>)}
          <p>Please reload the page to try again</p>
        </div>}
        {!this.props.playbackInfo && <EmptyPlayback />}
        {this.props.playbackInfo && this.props.playbackInfo.item && <Song
            track={this.props.playbackInfo.item}
            album={album}
            artist={artist}
            bestMatch={bestMatch}
            progress={(search || {}).progress} />}
      </div>
    );
  }
}

const mapStateToProps = ({
  searches, albums, artists, playbackInfo,
}) => ({
  searches, albums, artists, playbackInfo,
});

const mapDispatchToProps = dispatch => ({
  setSearchResult: (id, search) => dispatch(setSearchResult(id, search)),
  setAlbum: (id, album) => dispatch(setAlbum(id, album)),
  setArtist: (id, artist) => dispatch(setArtist(id, artist)),
  setPlaybackInfo: info => dispatch(setPlaybackInfo(info)),
});

App.propTypes = {
  albums: PropTypes.object.isRequired,
  artists: PropTypes.object.isRequired,
  backend: PropTypes.func.isRequired,
  playbackInfo: PropTypes.object,
  searches: PropTypes.object.isRequired,
  setAlbum: PropTypes.func.isRequired,
  setArtist: PropTypes.func.isRequired,
  setPlaybackInfo: PropTypes.func.isRequired,
  setSearchResult: PropTypes.func.isRequired,
  spotifyApi: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
