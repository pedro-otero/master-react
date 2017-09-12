import React, {Component} from 'react';
import AuthenticationWarning from './AuthenticationWarning';
import Home from './Home';

const album = {
    title: 'Bold Statement',
    artist: 'Da Next Indie Sh¡+',
    tracks: [{
        title: 'Something Dark but Relatable',
        producers: ['Obscure Producer', 'Renata Names'],
        composers: ['John Frontman', 'Jane Drummer', 'Seasoned Oldguy'],
        featured: ['Z.I.C.K rappa\'']
    }, {
        title: 'Our Second Single (Massive Flop)',
        producers: ['John Frontman', 'Renata Names'],
        composers: ['John Frontman'],
        featured: []
    }]
}

class App extends Component {

    constructor(props) {
        super(props);
        if (window.location.hash) {
            let auth = this.digestHash();
            if (this.isAuthenticated(auth)) {
                this.contents = <Home/>;
            } else {
                this.contents = <AuthenticationWarning error={auth.error} state={auth.state}
                                                       scopes={props.scopes} clientId={props.clientId}
                                                       redirectUri={props.redirectUri}/>;
            }
        } else {
            this.contents =
                <AuthenticationWarning scopes={props.scopes} clientId={props.clientId} redirectUri={props.redirectUri}/>;
        }
    }

    digestHash() {
        const auth = window.location.hash.substr(1).split('&')
            .map(pair => pair.split('='))
            .reduce((all, pair) => Object.defineProperty(all, pair[0], {enumerable: true, value: pair[1]}), {});
        console.log(JSON.stringify(auth));
        return auth;
    }

    isAuthenticated(auth) {
        return auth && auth.access_token;
    }

    render() {
        return (<div>{this.contents}</div>);
    }
}

export default App;
