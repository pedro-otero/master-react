import * as types from "./types";

export const loadSavedAlbums = () => {
    return function (dispatch, getState, spotifyApi) {
        spotifyApi.getSavedAlbums().subscribe({
            next: (page) => dispatch(receiveSavedAlbumsPage(page)),
            complete: () => {
            },
            error: () => {
            }
        });
    }
}

export const receiveSavedAlbumsPage = (page) => {
    return {type: types.LOAD_SAVED_ALBUMS_PAGE_SUCCESS, page};
}

export const loadSavedTracks = () => {
    return function (dispatch, getState, spotifyApi) {
        spotifyApi.getSavedTracks().subscribe({
            next: (page) => dispatch(receiveSavedTracksPage(page)),
            complete: () => {
            },
            error: () => {
            }
        });
    }
}

export const receiveSavedTracksPage = (page) => {
    return {type: types.LOAD_SAVED_TRACKS_PAGE_SUCCESS, page};
}


export const loadProfile = () => {
    return function(dispatch, getState, spotifyApi){
        spotifyApi.profile().then(profile => dispatch(receiveProfile(profile)))
    }
}

export const receiveProfile = (profile) => {
    return {type: types.LOAD_PROFILE_SUCCESS, profile};
}

export const getTrack = (id) => {
    return function(dispatch, getState, spotifyApi) {
        return spotifyApi.getTrack(id);
    }
}

export const getAlbum = (id) => {
    return function(dispatch, getState, spotifyApi) {
        return spotifyApi.getAlbum(id);
    }
}