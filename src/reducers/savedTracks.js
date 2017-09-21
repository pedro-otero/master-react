import * as actions from "../actions/types";

export default function savedTracksReducer(state = [], action) {
    switch (action.type) {
        case actions.LOAD_SAVED_TRACKS_PAGE_SUCCESS:
            return [...state, action.page];
        default:
            return state;
    }
};