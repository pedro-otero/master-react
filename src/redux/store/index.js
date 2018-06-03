import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import generateReducer from '../reducers/generate-reducer';
import setPlaybackInfo from '../reducers/spotify';

const store = spotifyApi => createStore(
  combineReducers({
    searches: generateReducer('SET_SEARCH_RESULT'),
    albums: generateReducer('SET_ALBUM'),
    artists: generateReducer('SET_ARTIST'),
    playbackInfo: setPlaybackInfo,
  }),
  applyMiddleware(thunkMiddleware.withExtraArgument(spotifyApi)),
);

export default store;
