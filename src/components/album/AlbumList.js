import React from 'react';
import Album from "./Album";
import {connect} from "react-redux";

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

const mapStateToProps = (state) => {
    return {
        pages: state.albums
    }
};

export default connect(mapStateToProps)(AlbumList);