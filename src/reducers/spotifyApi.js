import * as actions from "../actions/types";
import initialState from "../store/initalState";
import SpotifyApi from '../api/spotify';
import spotifyConfig from '../config/spotify';

export default function spotifyApiReducer(state = initialState.spotifyApi, action) {
    switch (action.type) {
        case actions.SPOTIFY_AUTHENTICATION_SUCCESS:
            const auth = action.hash.substr(1).split('&')
                .map(pair => pair.split('='))
                .reduce((all, pair) =>
                        Object.defineProperty(all, pair[0], {enumerable: true, value: pair[1]}),
                    {});
            const api = new SpotifyApi(spotifyConfig);
            api.setAccessToken(auth.access_token);
            return api;
    }
    return state;
};