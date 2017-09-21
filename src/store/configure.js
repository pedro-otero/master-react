import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index';
import initialState from './initalState';

import {routerMiddleware} from 'react-router-redux'

export default (history) => createStore(
    rootReducer,
    initialState,
    applyMiddleware(routerMiddleware(history)))