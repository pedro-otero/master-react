import { createStore, combineReducers } from 'redux';
import searches from '../reducers/searches';

const store = () => createStore(combineReducers({
  searches,
}));

export default store;
