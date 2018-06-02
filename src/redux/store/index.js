import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import generateReducer from '../reducers/generate-reducer';
import setPlaybackInfo from '../reducers/playback-info';

const store = () => createStore(
  combineReducers({
    searches: generateReducer('SET_SEARCH_RESULT'),
    albums: generateReducer('SET_ALBUM'),
    artists: generateReducer('SET_ARTIST'),
    playbackInfo: setPlaybackInfo,
  }),
  applyMiddleware(thunkMiddleware),
);

export default store;
