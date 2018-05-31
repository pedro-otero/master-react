import { createStore, combineReducers } from 'redux';
import bestMatches from '../reducers/best-matches';

const store = createStore(combineReducers({
  bestMatches,
}));

export default store;
