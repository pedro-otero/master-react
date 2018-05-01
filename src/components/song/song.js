import React from 'react';
import {connect} from "react-redux";
import './style.css';

class Song extends React.Component {

  render() {

    const { track, data, artist, album } = this.props;
    const mainArtistName = track.artists[0].name || '';

    const layers = (image) => ({
      backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 65%, black), 
            url(${image.url})`
    });

    return <article>
      {<div className="header">
        <div className="content">
          <div className="albumCover" style={{ backgroundImage: `url(${track.album.images[0].url})` }}>
            <span className="albumYear">{album.release_date.substring(0, 4)}</span>
          </div>
          <div>
            <span className="artistName">{mainArtistName}</span>
            <br/>
            <span className="trackName">{track.name}</span>
            <br/>
            <span className="composers">
              {data.composers.map((name, i) => (
                <span key={`composer-${name}-${i}`}>{name}</span>
              ))}
            </span>
            <br/>
            <span className="producers">
              {data.producers.map((name, i) => (
                <span key={`producer-${name}-${i}`}>{name}</span>
              ))}
            </span>
          </div>
        </div>
        <div className="artistImg" style={layers(artist.images[0])}>

        </div>
      </div>}
      {<div className="credits">
        {Object.keys(data.credits).map((collaborator, i) => (
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
