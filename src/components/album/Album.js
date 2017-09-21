import React from 'react';
import {millisToString} from "../../util/index";

const Album = ({album}) => {

    return (
        <div>
            <div className="row">
                <div className="col col-md-2">
                    <img src={album.images[0].url} className="img-fluid" alt="cover"></img>
                </div>
                <div className="column col-md-8 col-lg-8">
                    <h5>{album.name}</h5>
                    <h6>{album.artists[0].name} ({album.release_date.substr(0, 4)})</h6>
                </div>
                <div className="col col-md-2 col-lg-2">
                    <p className="text-right">{millisToString(album.tracks.items.reduce((total, track) => total + Number(track.duration_ms),0))}</p>
                </div>
            </div>
        </div>
    )
}

export default Album;