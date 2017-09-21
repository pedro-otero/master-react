import * as actions from "../actions/types";
import initalState from "../store/initalState";

export default function savedAlbumsReducer(state = initalState.albums, action) {
    switch (action.type) {
        case actions.LOAD_SAVED_ALBUMS_PAGE_SUCCESS:
            return [...state, action.page];
        default:
            return state;
    }
};