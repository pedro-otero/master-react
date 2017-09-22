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