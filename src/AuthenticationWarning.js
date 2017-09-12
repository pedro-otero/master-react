import React from 'react';
import {Button} from "react-bootstrap";

const AuthenticationWarning = (props) => {

    const url = `https://accounts.spotify.com/authorize?client_id=${props.clientId}&response_type=token&redirect_uri=${props.redirectUri}&state=reactApp&scope=${props.scopes}&show_dialog=false`;

    const redirect = () => window.location = url;

    const state = props.state ? <p>props.state</p> : '';
    const error = props.error ? <p>props.error</p> : '';

    return (
        <div className="container container-table">
            <div className="well">
                {state}
                {error}
                <p>You need to login to Spotify to use this app</p>
                <Button bsStyle="success" onClick={redirect}>Login</Button>
            </div>
        </div>
    )
}

export default AuthenticationWarning;