import * as types from "./types";

export const receiveProfile = (profile) => {
    return {type: types.LOAD_PROFILE_SUCCESS, profile};
}