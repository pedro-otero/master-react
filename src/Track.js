import React from 'react';

const Track = (props) => {

    const track = props.album.tracks[props.index];
    const feat = track.featured.length ? `(feat. ${track.featured.join(', ')})` : '';
    const albumRow = props.showAlbum ? <h2>{props.album.artist} - {props.album.title}</h2> : '';
    const trackNumber = props.showTrackNumber ? `${props.index + 1}.` : '';

    return (
        <div>
            <h1>{trackNumber} {track.title} {feat}</h1>
            {albumRow}
            <h3><i>{track.composers.join(' / ')}</i></h3>
            <h3>Produced by {track.producers.join(', ')}</h3>
        </div>
    )
}

export default Track;