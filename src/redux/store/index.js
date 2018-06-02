import { createStore, combineReducers } from 'redux';
import generateReducer from '../reducers/generate-reducer';
import setPlaybackInfo from '../reducers/playback-info';

const store = () => createStore(combineReducers({
  searches: generateReducer('SET_SEARCH_RESULT'),
  albums: generateReducer('SET_ALBUM'),
  artists: generateReducer('SET_ARTIST'),
  playbackInfo: setPlaybackInfo,
}));

export default store;
