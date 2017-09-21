import React from 'react';
import SpotifyApi from './api/spotify';
import WelcomeBanner from "./components/WelcomeBanner";
import SideBar from "./components/SideBar";
import TrackList from "./components/track/TrackList";
import AlbumList from "./components/album/AlbumList";
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as savedTracksActions from './actions/savedTracks';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.spotifyApi = new SpotifyApi({
            clientId: props.clientId,
            redirectUri: props.redirectUri
        });
        this.state = {albums: [], profile: null, selected: 'home'};
        this.select = this.select.bind(this);
        this.goHome = this.goHome.bind(this);
        this.goToTracks = this.goToTracks.bind(this);
        this.goToAlbums = this.goToAlbums.bind(this);
    }

    componentDidMount() {
        this.load();
    }

    load() {
        this.spotifyApi.profile().then(profile => this.setState({profile}));
        this.spotifyApi.getSavedTracks().subscribe({
            next: this.props.actions.receiveSavedTracksPage,
            complete: () => {
            },
            error: () => {
            }
        });
        this.spotifyApi.getSavedAlbums().subscribe({
            next: (page) => this.setState(previous => ({albums: [...previous.albums, page]})),
            complete: () => {
            },
            error: () => {
            }
        });
    }

    select(selected) {
        this.setState({selected});
    }

    goHome() {
        this.select('home');
    }

    goToTracks() {
        this.select('tracks');
    }

    goToAlbums() {
        this.select('albums');
    }

    render() {
        if (this.state.profile != null) {
            return (
                <div className="grid">
                    <div className="row">
                        <div className="col-md-2">
                            <SideBar onHome={this.goHome} onTracks={this.goToTracks} onAlbums={this.goToAlbums}/>
                        </div>
                        <div className="col-md-10">
                            {this.state.selected === 'home' &&
                            <WelcomeBanner profile={this.state.profile} tracks={this.props.tracks}
                                           albums={this.state.albums}/>}
                            {this.state.selected === 'tracks' && <TrackList pages={this.props.tracks}/>}
                            {this.state.selected === 'albums' && <AlbumList pages={this.state.albums}/>}
                        </div>
                    </div>
                </div>
            )
        } else {
            return (
                <div>Loading...</div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    tracks: state.tracks
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(savedTracksActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);