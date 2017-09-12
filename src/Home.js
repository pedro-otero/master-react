import React from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

class Home extends React.Component {

    constructor(props) {
        super(props);
        const spotifyApi = new SpotifyWebApi({
            clientId: props.clientId,
            redirectUri: props.redirectUri
        });
        spotifyApi.setAccessToken(props.auth.access_token);
        spotifyApi.getMe().then(this.start.bind(this));
    }

    start(profile) {
        console.log(profile);
        this.setState({profile: profile.body});
        this.forceUpdate();
    }

    render() {
        if (this.state) {
            return (
                <div>
                    <p>{this.state.profile.id} got me authenticated!!</p>
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