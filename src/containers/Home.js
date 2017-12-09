import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Route} from "react-router";
import {withRouter} from "react-router-dom";

import * as spotifyActions from '../actions/spotify';
import Song from "../components/song/song";

class Home extends React.Component {

    componentDidMount() {
        this.props.actions.getCurrentPlayback();
    }

    render() {
        return (
            <div>
                <Route exact path="/" component={Song}/>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({...spotifyActions}, dispatch)
});

export default withRouter(connect(() => {}, mapDispatchToProps)(Home));