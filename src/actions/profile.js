import * as types from "./types";

export const loadProfile = (api) => {
    return function(dispatch){
        api.profile().then(profile => dispatch(receiveProfile(profile)))
    }
}

export const receiveProfile = (profile) => {
    return {type: types.LOAD_PROFILE_SUCCESS, profile};
}