import React from 'react';
import WelcomePage from "../components/WelcomePage";
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

    componentDidMount() {
        this.props.actions.loadProfile();
        this.props.actions.loadSavedTracks();
        this.props.actions.loadSavedAlbums();
    }

    render() {
        if (this.props.profile.loaded === false) {
            return (
                <div>Loading...</div>
            )
        } else {
            return (
                <div>
                    <Route exact path="/" component={WelcomePage}/>
                    <Route exact path="/tracks" component={TrackList}/>
                    <Route exact path="/tracks/:id" component={TrackDetail}/>
                    <Route exact path="/albums" component={AlbumList}/>
                    <Route exact path="/albums/:id" component={AlbumDetail}/>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        profile: state.profile
    }
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...spotifyActions}, dispatch)
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));