import React from 'react';
import {connect} from "react-redux";
import {millisToString} from "../../util/index";
import {bindActionCreators} from "redux";
import * as spotifyActions from '../../actions/spotify';
import * as backendActions from '../../actions/backend';

class TrackDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.loadSpotifyAlbum.bind(this)();
    }

    loadSpotifyAlbum() {
        this.props.actions.getAlbum(this.props.match.params.id).then(album => this.setState({album}));
        this.props.actions.getAlbumDetails(this.props.match.params.id).then(details => this.setState({details}));
    }

    render() {
        return (
            <div>
                {this.state.album && <div className="row">
                    <div className="col col-md-2">
                        <img src={this.state.album.images[0].url} className="img-fluid" alt="cover"></img>
                    </div>
                    <div className="column col-md-8 col-lg-8">
                        <h5>{this.state.album.name}</h5>
                        <h6>{this.state.album.artists.map(artist => artist.name).join(', ')}</h6>
                        <h6>{this.state.album.release_date.substr(0, 4)}</h6>
                    </div>
                    <div className="col col-md-2 col-lg-2">
                        <p className="text-right">{millisToString(this.state.album.tracks.items.reduce((total, track) => total + track.duration_ms, 0))}</p>
                    </div>
                </div>}
                {this.state.details && <ul className="list-group">
                    {
                        this.state.details.tracks.map((track, i) =>
                            <li key={i} className="list-group-item">
                                <h4>{i + 1}. {track.title}</h4>
                                <h5>{track.composers.join(' / ')}</h5>
                                <h6>{track.producers.join(', ')}</h6>
                            </li>)
                    }
                </ul>}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({...spotifyActions, ...backendActions}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackDetail);