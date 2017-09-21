import * as actions from "../actions/types";

export default function savedAlbumsReducer(state = [], action) {
    switch (action.type) {
        case actions.LOAD_SAVED_ALBUMS_PAGE_SUCCESS:
            return [...state, action.page];
        default:
            return state;
    }
};