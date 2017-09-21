import {createStore} from 'redux';
import rootReducer from '../reducers/index';
import initialState from './initalState';

export default () => createStore(rootReducer, initialState)