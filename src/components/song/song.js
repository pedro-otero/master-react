import React from 'react';
import {connect} from "react-redux";
import './style.css';

class Song extends React.Component {

  render() {

    const { track, data, artist, album } = this.props;
    const mainArtistName = (track && track.artists[0].name) || '';

    const roles = name => {
      const result = [];
      if (name === mainArtistName) {
        result.push('main-artist');
      }
      if (data.composers.includes(name)) {
        result.push('composer');
      }
      if (data.producers.includes(name)) {
        result.push('producer');
      }
      if (track.artists.splice(1).map(artist => artist.name).includes(name)) {
        result.push('featured');
      }
      return result;
    }

    const collaborator = name => {
      return <span className={['collaborator', ...roles(name)].join(' ')}>{name}</span>
    }

    const layers = (image) => ({
      backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 65%, black), 
            url(${image.url})`
    });

    return <article>
      {track && artist && data && album && <div className="header">
        <div className="content">
          <div className="albumCover" style={{ backgroundImage: `url(${track.album.images[0].url})` }}>
            <span className="albumYear">{album.release_date.substring(0, 4)}</span>
          </div>
          <div>
            <span className="artistName">{mainArtistName}</span>
            <br/>
            <span className="trackName">{track.name}</span>
            <br/>
            <span className="composers">{data.composers.map(collaborator)}</span>
            <br/>
            <span className="producers">{data.producers.map(collaborator)}</span>
          </div>
        </div>
        <div className="artistImg" style={layers(artist.images[0])}>

        </div>
      </div>}
      {data && data.credits && <div className="credits">
        {data && Object.keys(data.credits).map((collaborator, i) => (
          <span key={i}>
                        <h5 className="collaboratorName">{collaborator}:</h5>
            {data.credits[collaborator].join(', ')}
                    </span>
        ))}
      </div>}
    </article>
  }
}

const mapStateToProps = (state) => {
  return {
    track: state.song.track,
    data: state.song.credits,
    artist: state.song.artist,
    album: state.song.album,
  }
};

export default connect(mapStateToProps)(Song);
