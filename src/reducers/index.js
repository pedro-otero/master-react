import tracks from './savedTracks';
import albums from './savedAlbums';
import profile from "./profile";
import {combineReducers} from 'redux';

const rootReducer = combineReducers({tracks, albums, profile});

export default rootReducer;