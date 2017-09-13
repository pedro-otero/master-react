import React from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import WelcomeBanner from "./WelcomeBanner";
import LibraryBadge from "./LibraryBadge";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            spotifyApi: new SpotifyWebApi({
                clientId: props.clientId,
                redirectUri: props.redirectUri
            }),
            pages: {tracks: [], albums: []}
        }
        this.state.spotifyApi.setAccessToken(props.auth.access_token);
        this.state.spotifyApi.getMe().then(this.start.bind(this));
    }

    handleError(err) {
        throw new Error(err);
    }

    start(profile) {
        console.log(profile);
        this.setState({profile: profile.body});
        this.loadTracks(20, 0);
        this.loadAlbums(20, 0);
    }

    loadTracks(limit, offset) {
        console.log(`Loading tracks now from ${offset} to ${limit}`)
        this.state.spotifyApi.getMySavedTracks({limit, offset}).then(this.receiveTracks.bind(this), this.handleError);
    }

    receiveTracks(page) {
        this.setState(prevState => ({
            pages: {
                tracks: prevState.pages.tracks.concat(page.body),
                albums: prevState.pages.albums
            }
        }));
        console.log(page);
        if (page.body.next != null) this.loadTracks(page.body.limit, page.body.offset + page.body.limit);
    }

    loadAlbums(limit, offset) {
        console.log(`Loading albums now from ${offset} to ${limit}`)
        this.state.spotifyApi.getMySavedAlbums({limit, offset}).then(this.receiveAlbums.bind(this), this.handleError);
    }

    receiveAlbums(page) {
        this.setState(prevState => ({
            pages: {
                tracks: prevState.pages.tracks,
                albums: prevState.pages.albums.concat(page.body)
            }
        }));
        console.log(page);
        if (page.body.next != null) this.loadAlbums(page.body.limit, page.body.offset + page.body.limit);
    }

    render() {
        if (this.state && this.state.profile) {
            return (
                <div>
                    <WelcomeBanner profile={this.state.profile}/>
                    <LibraryBadge pages={this.state.pages.tracks}/>
                    <LibraryBadge pages={this.state.pages.albums}/>
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