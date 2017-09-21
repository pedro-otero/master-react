import * as types from "./types";

export const receiveSavedTracksPage = (page) => {
    return {type: types.LOAD_SAVED_TRACKS_PAGE_SUCCESS, page};
}