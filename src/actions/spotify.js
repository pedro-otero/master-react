import * as types from "./types";

export const loadSavedAlbums = (api) => {
    return function (dispatch) {
        api.getSavedAlbums().subscribe({
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

export const loadSavedTracks = (api) => {
    return function (dispatch) {
        api.getSavedTracks().subscribe({
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


export const loadProfile = (api) => {
    return function(dispatch){
        api.profile().then(profile => dispatch(receiveProfile(profile)))
    }
}

export const receiveProfile = (profile) => {
    return {type: types.LOAD_PROFILE_SUCCESS, profile};
}