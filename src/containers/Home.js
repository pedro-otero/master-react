import React from 'react';
import SpotifyApi from '../api/spotify';
import WelcomeBanner from "../components/WelcomeBanner";
import SideBar from "../components/SideBar";
import TrackList from "../components/track/TrackList";
import AlbumList from "../components/album/AlbumList";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as savedTracksActions from '../actions/savedTracks';
import * as savedAlbumsActions from '../actions/savedAlbums';
import * as profileActions from '../actions/profile';
import {Route} from "react-router";
import {withRouter} from "react-router-dom";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.spotifyApi = new SpotifyApi({
            clientId: props.clientId,
            redirectUri: props.redirectUri
        });
    }

    componentDidMount() {
        this.load();
    }

    load() {
        this.spotifyApi.profile().then(this.props.actions.receiveProfile);
        this.spotifyApi.getSavedTracks().subscribe({
            next: this.props.actions.receiveSavedTracksPage,
            complete: () => {
            },
            error: () => {
            }
        });
        this.spotifyApi.getSavedAlbums().subscribe({
            next: this.props.actions.receiveSavedAlbumsPage,
            complete: () => {
            },
            error: () => {
            }
        });
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
                            <Route path="/tracks" component={TrackList}/>
                            <Route path="/albums" component={AlbumList}/>
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
        clientId: state.spotifyConfig.clientId,
        redirectUri: state.spotifyConfig.redirectUri
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...savedTracksActions, ...savedAlbumsActions, ...profileActions}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));