import React from 'react';
import Track from "./Track";
import {connect} from "react-redux";

const TrackList = ({pages}) => {
    return (
        <div>{
            pages.reduce((all, page) => all.concat(page.items), [])
                .map((savedTrack, i) =>
                    <Track key={i} track={savedTrack.track} showAlbum={true}/>
                )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        pages: state.tracks
    }
};

export default connect(mapStateToProps)(TrackList);