import React from 'react';
import {millisToString} from "../../util/index";
import {Link} from "react-router-dom";

const Track = ({track, showAlbum}) => {

    const otherArtists = track.artists.slice(1).map(artist => artist.name);

    return (
        <Link to={"/tracks/" + track.id}>
            <div className="row no-gutters p-1 border border-top-0 border-left-0 border-right-0 border-secondary">
                <div className="col col-2 mr-1">
                    <img src={track.album.images[0].url} className="img-fluid rounded" alt="cover"></img>
                </div>
                <div className="col text-nowrap text-truncate" style={{display: "inline-block"}}>
                    <strong>{track.name} {otherArtists.length > 0 && `(feat. ${otherArtists.join(', ')})`}</strong>
                    <br/>{track.artists[0].name}{showAlbum && ` - ${track.album.name}`}
                </div>
                <div className="col col-2 text-right">
                    {millisToString(track.duration_ms)}
                </div>
            </div>
        </Link>
    )
}

export default Track;