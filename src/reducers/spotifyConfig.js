import * as actions from "../actions/types";
import initialState from "../store/initalState";

export default function spotifyConfigReducer(state = initialState.spotifyConfig, action) {
    switch (action.type) {
        case actions.SPOTIFY_LOAD_CONFIG:
            return action.spotifyConfig;
        default:
            return state;
    }
};