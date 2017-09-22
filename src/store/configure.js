import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';
import initialState from './initalState';
import thunkMiddleware from 'redux-thunk';

import {routerMiddleware} from 'react-router-redux'

export default (history) => createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, routerMiddleware(history)))