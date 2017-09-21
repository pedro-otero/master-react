import React from 'react';
import {millisToString} from "../../util/index";

const Track = ({track, showAlbum}) => {

    const otherArtists = track.artists.slice(1).map(artist => artist.name);

    return (
        <div className="row">
            <div className="col col-md-2">
                <img src={track.album.images[0].url} className="img-fluid" alt="cover"></img>
            </div>
            <div className="column col-md-8 col-lg-8">
                <h5>{track.name} {otherArtists.length > 0 && `(feat. ${otherArtists.join(', ')})`}</h5>
                <h6>{track.artists[0].name}{showAlbum && ` - ${track.album.name}`}</h6>
            </div>
            <div className="col col-md-2 col-lg-2">
                <p className="text-right">{millisToString(track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Track;