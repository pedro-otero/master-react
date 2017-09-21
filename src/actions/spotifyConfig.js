import * as types from "./types";

export const loadSpotifyConfiguration = (spotifyConfig) => {
    return {type: types.SPOTIFY_LOAD_CONFIG, spotifyConfig};
}