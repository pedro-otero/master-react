import React from 'react';
import SpotifyApi from './api/spotify';
import WelcomeBanner from "./WelcomeBanner";
import SideBar from "./SideBar";
import TrackList from "./TrackList";
import AlbumList from "./AlbumList";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.spotifyApi = new SpotifyApi({
            clientId: props.clientId,
            redirectUri: props.redirectUri
        });
        this.state = {tracks: [], albums: [], profile: null, selected: 'home'};
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
            next: (page) => this.setState(previous => ({tracks: [...previous.tracks, page]})),
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
                            {this.state.selected === 'home' && <WelcomeBanner profile={this.state.profile} tracks={this.state.tracks} albums={this.state.albums} />}
                            {this.state.selected === 'tracks' && <TrackList pages={this.state.tracks}/>}
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

export default Home;