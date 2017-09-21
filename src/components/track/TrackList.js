import React from 'react';
import Track from "./Track";
import {connect} from "react-redux";

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

const mapStateToProps = (state) => {
    return {
        pages: state.tracks
    }
};

export default connect(mapStateToProps)(TrackList);