import * as types from "./types";

export const receiveSavedAlbumsPage = (page) => {
    return {type: types.LOAD_SAVED_ALBUMS_PAGE_SUCCESS, page};
}