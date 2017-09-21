import React from 'react';

const AuthenticationWarning = ({clientId, redirectUri, scopes}) => {

    const url = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&state=reactApp&scope=${scopes}&show_dialog=false`;

    return (
        <div className="container container-table">
            <div className="jumbotron">
                <h1 className="display-3">Hey there!</h1>
                <p>You need to login to Spotify to use this app</p>
                <input type="button" className="btn btn-success" onClick={() => window.location = url} value="Login"/>
            </div>
        </div>
    )
}

export default AuthenticationWarning;