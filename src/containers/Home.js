import React from 'react';
import WelcomeBanner from "../components/WelcomeBanner";
import SideBar from "../components/SideBar";
import TrackList from "../components/track/TrackList";
import AlbumList from "../components/album/AlbumList";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as spotifyActions from '../actions/spotify';
import {Route} from "react-router";
import {withRouter} from "react-router-dom";
import TrackDetail from "../components/track/TrackDetail";
import AlbumDetail from "../components/album/AlbumDetail";

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.load();
    }

    load() {
        this.props.actions.loadProfile(this.props.spotifyApi);
        this.props.actions.loadSavedTracks(this.props.spotifyApi);
        this.props.actions.loadSavedAlbums(this.props.spotifyApi);
    }

    render() {
        if (this.props.profile.loaded === false) {
            return (
                <div>Loading...</div>
            )
        } else {
            return (
                <div className="grid">
                    <div className="row">
                        <div className="col-md-2">
                            <SideBar/>
                        </div>
                        <div className="col-md-10">
                            <Route exact path="/" component={WelcomeBanner} />
                            <Route exact path="/tracks" component={TrackList}/>
                            <Route exact path="/tracks/:id" component={TrackDetail}/>
                            <Route exact path="/albums" component={AlbumList}/>
                            <Route exact path="/albums/:id" component={AlbumDetail}/>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile,
        spotifyApi: state.spotifyApi
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...spotifyActions}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));