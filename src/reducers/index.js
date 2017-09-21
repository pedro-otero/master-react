import tracks from './savedTracks';
import albums from './savedAlbums';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({tracks, albums});

export default rootReducer;