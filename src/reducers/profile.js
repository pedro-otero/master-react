import * as actions from "../actions/types";
import initialState from "../store/initalState";

export default function profileReducer(state = initialState.profile, action) {
    switch (action.type) {
        case actions.LOAD_PROFILE_SUCCESS:
            return action.profile;
        default:
            return state;
    }
};