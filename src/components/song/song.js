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
            {track && artist && <div className="header">
                <div className="content">
                    <div>
                        <img className="albumCover" alt="cover" src={track.album.images[0].url}/>
                    </div>
                    <div>
                        <h2>{track.name}</h2>
                        <h3>{mainArtistName} - {track.album.name}</h3>
                    </div>
                </div>
                <div className="background" style={layers(artist.images[0])}>

                </div>
            </div>}
            {credits && <div>
                <p><h4>Composers: </h4>{credits.composers.map(collaborator)}</p>
                <p><h4>Producers: </h4>{credits.producers.map(collaborator)}</p>
                <p><h4>Other credits: </h4>
                    <ul>
                        {credits.collaborators.map(collaborator => (
                            <li key={collaborator.name}><h5>{collaborator.name}:</h5> {collaborator.roles.join(', ')}
                            </li>
                        ))}
                    </ul>
                </p>
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