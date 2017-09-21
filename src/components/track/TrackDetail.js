import React from 'react';
import {connect} from "react-redux";
import Backend from '../../api/backend';
import SpotifyApi from '../../api/spotify';
import {millisToString} from "../../util/index";

class TrackDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backend: new Backend(),
            spotifyApi: new SpotifyApi({
                clientId: props.clientId,
                redirectUri: props.redirectUri
            })
        };
    }

    componentDidMount() {
        this.loadSpotifyTrack.bind(this)();
    }

    loadSpotifyTrack() {
        this.state.spotifyApi.getTrack(this.props.match.params.id).then(this.loadTrackDetails.bind(this));
    }

    loadTrackDetails(track) {
        console.log('got track');
        this.setState({track});
        this.state.backend.getTrack(track).then(details => this.setState({details}));
    }

    render() {
        return (
            <div>
                {this.state.track && <div className="row">
                    <div className="col col-md-2">
                        <img src={this.state.track.album.images[0].url} className="img-fluid" alt="cover"></img>
                    </div>
                    <div className="column col-md-8 col-lg-8">
                        <h5>{this.state.track.name} {this.state.track.artists.length > 1 && `(feat. ${this.state.track.artists.slice(1).map(artist => artist.name).join(', ')})`}</h5>
                        <h6>{this.state.track.artists[0].name} - {this.state.track.album.name}</h6>
                    </div>
                    <div className="col col-md-2 col-lg-2">
                        <p className="text-right">{millisToString(this.state.track.duration_ms)}</p>
                    </div>
                </div>}
                {this.state.details && <div className="row">
                    <p><strong>Written by: </strong>{this.state.details.composers.join(', ')}</p>
                    <p><strong>Producers: </strong>{this.state.details.producers.join(', ')}</p>
                    <p><strong>Other artists: </strong>
                        {Object.keys(this.state.details.credits).map((name, i) => <p key={i}><h1>{name}: </h1>
                                {this.state.details.credits[name].join(', ')}</p>)}</p>
                </div>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        clientId: state.spotifyConfig.clientId,
        redirectUri: state.spotifyConfig.redirectUri
    }
};

export default connect(mapStateToProps)(TrackDetail);