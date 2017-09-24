import React from 'react';
import {millisToString} from "../../util/index";
import {Link} from "react-router-dom";

const Album = ({album}) => {

    return (
        <Link to={"albums/" + album.id}>
            <div className="row no-gutters p-1 border border-top-0 border-left-0 border-right-0 border-secondary">
                <div className="col col-2 mr-1">
                    <img src={album.images[0].url} className="img-fluid rounded" alt="cover"></img>
                </div>
                <div className="col text-nowrap text-truncate" style={{display: "inline-block"}}>
                    <strong>{album.name}</strong><br/>
                    {album.artists[0].name} ({album.release_date.substr(0, 4)})
                </div>
                <div className="col col-2 text-right">
                    {millisToString(album.tracks.items.reduce((total, track) => total + Number(track.duration_ms), 0))}
                </div>
            </div>
        </Link>
    )
}

export default Album;