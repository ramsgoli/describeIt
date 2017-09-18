import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import {reducer as notificationsReducer} from 'reapop'

import { Game, createGame, joinGame, startGame,  setGameState, gameStates } from './Game'
import { setPlayerName, setSocketId, addSubmission, CurrentPlayer } from './CurrentPlayer'
import { Players, addPlayer, removePlayer, addPlayerSubmission } from './Players'

const store = createStore(
    combineReducers({
        CurrentPlayer,
        Players,
        Game,
        notifications: notificationsReducer(),
    }),
    applyMiddleware(
        thunkMiddleware,
        createLogger({collapsed: true}),
    )
)

const gameActions = {
    createGame, joinGame, startGame, setGameState
}

const currentPlayerActions = {
    setPlayerName, addSubmission, setSocketId
}

const playerActions = {
    addPlayer, removePlayer, addPlayerSubmission
}

export {store,
    gameActions, gameStates,
    currentPlayerActions, playerActions
}