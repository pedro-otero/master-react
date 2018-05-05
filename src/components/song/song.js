import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './style.css';
import * as spotifyActions from '../../actions/spotify';

export class Song extends React.Component {
  componentDidMount() {
    this.props.actions.getCurrentPlayback();
  }

  componentWillUnmount() {
    this.timer = null;
  }

  getStatus() {
    const {
      track,
      data: { credits },
      artist,
      album,
      progress,
    } = this.props;
    console.log(credits);
    if (!track.id && !artist.id && !album.id) {
      return 'empty';
    }
    if (progress === 100) {
      return 'finished';
    }
    if ((track.id || artist.id || album.id) && !Object.keys(credits).length) {
      return 'no-credits';
    }
    if ((track.id || artist.id || album.id) && Object.keys(credits).length) {
      return 'with-credits';
    }
    return '';
  }

  startPollingCredits() {
    this.timer = setInterval(() => {
      this.props.actions.getCredits();
    }, this.props.pollFreq);
  }

  render() {
    const {
      track,
      data: {
        composers,
        producers,
        credits,
      },
      artist,
      album,
      progress,
    } = this.props;
    const mainArtistName = track.artists[0].name || '';
    const status = this.getStatus();

    if (progress !== null && !this.timer) {
      this.startPollingCredits();
    }
    if (progress === 100 && this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }

    const layers = image => ({
      backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 65%, black), 
            url(${image.url})`,
    });

    return <article>
      {status === 'empty' && <div className="all-data-empty">
        EMPTY
      </div>}
      <div className="header">
        <div className="content">
          <div className="albumCover" style={{ backgroundImage: `url(${track.album.images[0].url})` }}>
            <span className="albumYear">{album.release_date.substring(0, 4)}</span>
          </div>
          <div>
            <span className="artistName">{mainArtistName}</span>
            <br/>
            <span className="trackName">{track.name}</span>
            <br/>
            {composers.length > 0 && <span className="composers">
              {composers.map((name, i) => (
                <span key={`composer-${name}-${i}`}>{name}</span>
              ))}
            </span>}
            <br/>
            {producers.length > 0 && <span className="producers">
              {producers.map((name, i) => (
                <span key={`producer-${name}-${i}`}>{name}</span>
              ))}
            </span>}
          </div>
        </div>
        <div className="artistImg" style={layers(artist.images[0])}>

        </div>
      </div>
      {status === 'with-credits' && <div className="progress small-progress">
        <div className="progress-all" style={{ width: '100%' }}></div>
        <div className="progress-done" style={{ width: `${progress}%` }}></div>
      </div>}
      <div className="credits">
        {Object.keys(credits).map((collaborator, i) => (
          <span key={i}>
            <h5 className="collaboratorName">
              {collaborator}:
            </h5>
            {credits[collaborator].join(', ')}
          </span>
        ))}
      </div>
      {status === 'no-credits' && <div className="progress big-progress">
        <div className="progress-all" style={{ width: '100%' }}></div>
        <div className="progress-done" style={{ width: `${progress}%` }}></div>
      </div>}
    </article>;
  }
}

Song.propTypes = {
  track: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  artist: PropTypes.object.isRequired,
  album: PropTypes.object.isRequired,
  progress: PropTypes.number,
  actions: PropTypes.shape({
    getCurrentPlayback: PropTypes.func.isRequired,
    getCredits: PropTypes.func.isRequired,
  }),
  pollFreq: PropTypes.number,
};

Song.defaultProps = {
  pollFreq: 1000,
};

const mapStateToProps = state => ({
  track: state.song.track,
  data: state.song.credits,
  artist: state.song.artist,
  album: state.song.album,
  progress: state.song.progress,
});

export default connect(mapStateToProps, dispatch => ({
  actions: bindActionCreators({ ...spotifyActions }, dispatch),
}))(Song);
