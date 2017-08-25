import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, routerReducer } from 'react-router-redux'

import {reducer as notificationsReducer} from 'reapop'

const history = createHistory()
const routingMiddleware = routerMiddleware(history)

import { Game, createGame, joinGame, startGame, gameStates } from './Game'
import { setPlayerName, addSubmission, CurrentPlayer } from './CurrentPlayer'

const store = createStore(
    combineReducers({
        CurrentPlayer,
        Game,
        notifications: notificationsReducer(),
        router: routerReducer
    }),
    applyMiddleware(
        thunkMiddleware,
        createLogger({collapsed: true}),
        routingMiddleware
    )
)

const gameActions = {
    createGame, joinGame, startGame
}

const currentPlayerActions = {
    setPlayerName, addSubmission
}

export {store, history,
    gameActions, gameStates,
    currentPlayerActions
}