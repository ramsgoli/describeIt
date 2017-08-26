import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import {reducer as notificationsReducer} from 'reapop'

import { Game, createGame, joinGame, startGame, setSocketId, gameStates } from './Game'
import { setPlayerName, addSubmission, CurrentPlayer } from './CurrentPlayer'

const store = createStore(
    combineReducers({
        CurrentPlayer,
        Game,
        notifications: notificationsReducer(),
    }),
    applyMiddleware(
        thunkMiddleware,
        createLogger({collapsed: true}),
    )
)

const gameActions = {
    createGame, joinGame, startGame, setSocketId
}

const currentPlayerActions = {
    setPlayerName, addSubmission
}

export {store,
    gameActions, gameStates,
    currentPlayerActions
}