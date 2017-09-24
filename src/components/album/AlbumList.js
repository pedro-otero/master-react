import React from 'react';
import Album from "./Album";
import {connect} from "react-redux";

const AlbumList = ({pages}) => {
    return (
        <div>            {
            pages.reduce((all, page) => all.concat(page.items), [])
                .map((savedAlbum, i) =>
                    <Album key={i} album={savedAlbum.album}/>
                )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        pages: state.albums
    }
};

export default connect(mapStateToProps)(AlbumList);