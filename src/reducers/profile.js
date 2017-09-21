import * as actions from "../actions/types";

export default function profileReducer(state = null, action) {
    switch (action.type) {
        case actions.LOAD_PROFILE_SUCCESS:
            return action.profile;
        default:
            return state;
    }
};