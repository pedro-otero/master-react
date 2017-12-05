import React from 'react';
import {connect} from "react-redux";

class Song extends React.Component {

    render() {
        const {track, credits} = this.props;
        return <div>
            {track && <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{flex: 3}}>
                    <img alt="cover" src={track.album.images[0].url} style={{maxWidth: '100%'}}/>
                </div>
                <div style={{flexDirection: 'column', flex: 7}}>
                    <p><strong>{track.name}</strong></p>
                    <p>{track.artists[0].name}</p>
                    <p>{track.album.name}</p>
                </div>
            </div>}
            {credits && <div>
                <p><strong>Composers: </strong>{credits.composers.join(', ')}</p>
                <p><strong>Producers: </strong>{credits.producers.join(', ')}</p>
                <p><strong>Other credits: </strong>
                    <ul>
                        {credits.collaborators.map(collaborator => (
                            <li key={collaborator.name}>{collaborator.name}: {collaborator.roles.join(', ')}</li>
                        ))}
                    </ul>
                </p>
            </div>}
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        track: state.song.track,
        credits: state.song.credits,
    }
};

export default connect(mapStateToProps)(Song);