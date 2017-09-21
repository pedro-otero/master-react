import React from 'react';

const SideBar = ({onHome, onTracks, onAlbums}) => {

    return (
        <ul className="list-group">
            <li className="list-group-item" onClick={onHome}>Home</li>
            <li className="list-group-item" onClick={onTracks}>Tracks</li>
            <li className="list-group-item" onClick={onAlbums}>Albums</li>
        </ul>
    )
}

export default SideBar;