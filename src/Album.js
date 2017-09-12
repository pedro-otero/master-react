import React from 'react';
import Track from './Track';

const Album = (props) => {

    const album = props.data;

    return (
        <div>
            {album.tracks.map((track, i) => <Track key={i} album={album} index={i} showAlbum={false}
                                                   showTrackNumber={true}/>)}
        </div>
    )
}

export default Album;