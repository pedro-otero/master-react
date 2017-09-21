import * as actions from "../actions/types";
import initialState from "../store/initalState";

export default function authenticationDataReducer(state = initialState.auth, action) {
    switch (action.type) {
        case actions.SPOTIFY_AUTHENTICATION_SUCCESS:
            return action.hash.substr(1).split('&')
                .map(pair => pair.split('='))
                .reduce((all, pair) => Object.defineProperty(all, pair[0], {enumerable: true, value: pair[1]}), {});
        default:
            return state;
    }
};