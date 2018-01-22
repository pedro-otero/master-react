import React from 'react';
import {connect} from "react-redux";
import './style.css';

class Song extends React.Component {

    render() {

        const {track, credits, artist} = this.props;
        const mainArtistName = (track && track.artists[0].name) || '';

        const roles = name => {
            const result = [];
            if (name === mainArtistName) {
                result.push('main-artist');
            }
            if (credits.composers.includes(name)) {
                result.push('composer');
            }
            if (credits.producers.includes(name)) {
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
            backgroundImage: `linear-gradient(rgba(0,0,0,0.35) 95%, black), 
            url(${image.url})`
        });

        return <article>
            {track && artist && credits && <div className="header">
                <div className="content">
                    <div className="albumCover" style={{backgroundImage: `url(${track.album.images[0].url})`}}>
                        <span className="albumYear">2006</span>
                    </div>
                    <div>
                        <span className="artistName">{mainArtistName}</span>
                        <br/>
                        <span className="trackName">{track.name}</span>
                        <br/>
                        <span className="composers">{credits.composers.map(collaborator)}</span>
                        <br/>
                        <span className="producers">{credits.producers.map(collaborator)}</span>
                    </div>
                </div>
                <div className="artistImg" style={layers(artist.images[0])}>

                </div>
            </div>}
            {credits && <div className="credits">
                {credits.collaborators.map((collaborator, i) => (
                    <span key={i}>
                        <h5 className="collaboratorName">{collaborator.name}:</h5>
                        {collaborator.roles.join(', ')}
                    </span>
                ))}
            </div>}
        </article>
    }
}

const mapStateToProps = (state) => {
    return {
        track: state.song.track,
        credits: state.song.credits,
        artist: state.song.artist,
    }
};

export default connect(mapStateToProps)(Song);