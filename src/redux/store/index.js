import { createStore, combineReducers } from 'redux';
import bestMatches from '../reducers/searches';

const store = () => createStore(combineReducers({
  bestMatches,
}));

export default store;
