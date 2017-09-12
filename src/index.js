import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App redirectUri="http://localhost:3000" clientId="ae9b2af5482c4de08716208f93071f26"
                     scopes="playlist-read-private user-read-private user-read-email user-read-playback-state user-read-currently-playing user-library-read"/>, document.getElementById('root'));
registerServiceWorker();
