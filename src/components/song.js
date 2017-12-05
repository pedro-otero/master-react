import React from 'react';
import {connect} from "react-redux";

class Song extends React.Component {

    render() {
        const {track, credits} = this.props;
        return <div>
            {track && <div>
                <p>{track.name}</p>
                <p>{track.artists[0].name}</p>
                <p>{track.album.name}</p>
            </div>}
            {credits && <div>
                <p>{credits.composers.join(', ')}</p>
                <p>{credits.producers.join(', ')}</p>
                {credits.collaborators.map(collaborator => (
                    <div>{collaborator.name}: {collaborator.roles.join(', ')}</div>
                ))}
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