export const getTrackDetails = (id) => {
    return function (dispatch, getState, {backend}) {
        return backend.getTrack(id);
    }
}

export const getAlbumDetails = (id) => {
    return function (dispatch, getState, {backend}) {
        return backend.getAlbum(id);
    }
}
