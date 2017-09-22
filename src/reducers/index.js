import tracks from './savedTracks';
import albums from './savedAlbums';
import profile from "./profile";
import spotifyApi from './spotifyApi';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({tracks, albums, profile, spotifyApi});

export default rootReducer;