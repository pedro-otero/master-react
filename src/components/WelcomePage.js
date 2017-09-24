import React from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const WelcomePage = ({profile, tracks, albums}) => {

    return (
        <div>
            <div className="grid mt-4">
                <div className="row">
                    <div className="col col-4">
                        <img className="img-fluid rounded" src={profile.images[0].url} alt="avatar"/>
                    </div>
                    <div className="col col-8">
                        <h3 className="text-right">Welcome, {profile.display_name.split(' ')[0]}!</h3>
                        <h6 className="text-right text-muted">@{profile.id}</h6>
                    </div>
                </div>
            </div>
            <div className="mt-4">
                {tracks.length && <Link to="/tracks">
                    <div className="jumbotron">
                        <h1>{tracks[0].total} tracks</h1>
                    </div>
                </Link>}
                {albums.length && <Link to="/albums">
                    <div className="jumbotron">
                        <h1>{albums[0].total} albums</h1>
                    </div>
                </Link>}
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        tracks: state.tracks,
        albums: state.albums,
        profile: state.profile
    }
};

export default connect(mapStateToProps)(WelcomePage);