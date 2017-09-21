import React from 'react';
import Album from "./Album";

const AlbumList = ({pages}) => {

    return (
        <ul className="list-group">
            {
                pages
                    .reduce((all, page) => all.concat(page.items), [])
                    .map((savedAlbum, i) =>
                        <li key={i} className="list-group-item">
                            <Album album={savedAlbum.album}/>
                        </li>)
            }
        </ul>
    )
}

export default AlbumList;