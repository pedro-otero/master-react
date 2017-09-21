import tracks from './savedTracks';
import albums from './savedAlbums';
import profile from "./profile";
import spotifyConfig from './spotifyConfig';
import auth from './authenticationData';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({tracks, albums, profile, spotifyConfig, auth});

export default rootReducer;