import React from 'react';
import {connect} from "react-redux";
import './style.css';

class Song extends React.Component {

    render() {

        const {track, credits, artist} = this.props;

        return <article>
            {track && <header>
                <div className="header-imageblock">
                    <img alt="cover" src={track.album.images[0].url} className="header-image"/>
                </div>
                <div className="header-title">
                    <h2>{track.name}</h2>
                    <h3>{track.artists[0].name} - {track.album.name}</h3>
                </div>
            </header>}
            {credits && <div>
                <p><h4>Composers: </h4>{credits.composers.join(', ')}</p>
                <p><h4>Producers: </h4>{credits.producers.join(', ')}</p>
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