import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, routerReducer } from 'react-router-redux'

import {reducer as notificationsReducer} from 'reapop'

const history = createHistory()
const routingMiddleware = routerMiddleware(history)

import { Home, createGame, joinGame } from './Home'
import { Lobby, startGame } from './Lobby'

const store = createStore(
    combineReducers({
        Home,
        Lobby,
        notifications: notificationsReducer(),
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

const lobbyActions = {
    startGame
}

export {store, history, homeActions, lobbyActions}