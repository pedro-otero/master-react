import React from 'react';
import Track from "./Track";

const TrackList = ({pages}) => {

    return (
        <ul className="list-group">
            {
                pages
                    .reduce((all, page) => all.concat(page.items), [])
                    .map((savedTrack, i) =>
                        <li key={i} className="list-group-item">
                            <Track track={savedTrack.track} showAlbum={true}/>
                        </li>)
            }
        </ul>
    )
}

export default TrackList;