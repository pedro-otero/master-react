import * as types from "./types";

export const getCurrentPlayback = () => {
    return function (dispatch, getState, {spotifyApi, backend}) {
        return spotifyApi.getCurrentPlayback()
            .then(playback => {
                dispatch({type: types.LOAD_PLAYBACK_SUCCESS, track: playback.body.item});
                spotifyApi.getAlbum(playback.body.item.album.id).then(album => {
                    backend.getCredits(playback.body.item, album.body).then(credits => {
                        dispatch({type: types.LOAD_CREDITS_SUCCESS, credits});
                    });
                })
            });
    }
}