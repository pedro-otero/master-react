import * as types from "./types";

export const loadSavedTracks = (api) => {
    return function(dispatch){
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