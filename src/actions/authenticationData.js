import * as types from "./types";

export const setAuthenticationData = (hash) => {
    return {type: types.SPOTIFY_AUTHENTICATION_SUCCESS, hash};
}