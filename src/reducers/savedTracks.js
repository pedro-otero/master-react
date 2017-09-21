import * as actions from "../actions/types";
import initalState from "../store/initalState";

export default function savedTracksReducer(state = initalState.tracks, action) {
    switch (action.type) {
        case actions.LOAD_SAVED_TRACKS_PAGE_SUCCESS:
            return [...state, action.page];
        default:
            return state;
    }
};