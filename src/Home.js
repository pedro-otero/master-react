import React from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import WelcomeBanner from "./WelcomeBanner";
import LibraryBadge from "./LibraryBadge";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.spotifyApi = new SpotifyWebApi({
            clientId: props.clientId,
            redirectUri: props.redirectUri
        });
        this.state = {
            pages: {tracks: [], albums: []}
        }
        this.spotifyApi.setAccessToken(props.auth.access_token);
        this.spotifyApi.getMe().then(this.start.bind(this));
    }

    handleError(limit, offset, entity) {
        return function (err) {
            const func = (entity === 'tracks' ? this.loadTracks : this.loadAlbums);
            let time = 0;
            console.error(err);
            console.log(`Error on ${entity} because of ${err.code} - ${err.status}`);
            if (err.code > 500) {
                time = 2000;
            } else if (err.code > 429) {
                time = 7000;
            }
            setTimeout(func.apply(this, limit, offset), time);
        }.bind(this);
    }

    start(profile) {
        console.log(profile);
        this.setState({profile: profile.body});
        this.loadTracks(20, 0);
        this.loadAlbums(20, 0);
    }

    loadTracks(limit, offset) {
        console.log(`Loading tracks now from ${offset} to ${limit}`)
        this.spotifyApi.getMySavedTracks({
            limit,
            offset
        }).then(this.receiveTracks.bind(this), this.handleError(limit, offset, 'tracks'));
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
        this.spotifyApi.getMySavedAlbums({
            limit,
            offset
        }).then(this.receiveAlbums.bind(this), this.handleError(limit, offset, 'albums'));
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
                    <LibraryBadge pages={this.state.pages.tracks} entityName="track"/>
                    <LibraryBadge pages={this.state.pages.albums} entityName="album"/>
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