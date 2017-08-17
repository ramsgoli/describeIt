import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, routerReducer } from 'react-router-redux'

const history = createHistory()
const routingMiddleware = routerMiddleware(history)

import { Home, createGame, joinGame } from './Home'

const store = createStore(
    combineReducers({
        Home,
        router: routerReducer
    }),
    applyMiddleware(
        thunkMiddleware,
        createLogger({collapsed: true}),
        routingMiddleware
    )
)

const homeActions = {
    createGame, joinGame
}

export {store, history, homeActions}