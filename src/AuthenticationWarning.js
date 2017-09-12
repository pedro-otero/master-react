import React from 'react';

const AuthenticationWarning = (props) => {

    const url = `https://accounts.spotify.com/authorize?client_id=${props.clientId}&response_type=token&redirect_uri=${props.redirectUri}&state=reactApp&scope=${props.scopes}&show_dialog=false`;

    const redirect = () => window.location = url;

    const state = props.state ? <p>props.state</p> : '';
    const error = props.error ? <p>props.error</p> : '';

    return (
        <div>
            {state}
            {error}
            <p>PLEASE LOGIN RIGHT NOW!!</p>
            <input type="submit" value="Click me to do it!" onClick={redirect}/>
        </div>
    )
}

export default AuthenticationWarning;