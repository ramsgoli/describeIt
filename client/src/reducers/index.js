import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import {reducer as notificationsReducer} from 'reapop'

import { Game, createGame, joinGame, startGame, setGameState, setQuestion, gameStates } from './Game'
import { setPlayerName, setSocketId, addSubmission, CurrentPlayer } from './CurrentPlayer'
import { Players, addPlayer, removePlayer, addPlayerSubmission } from './Players'

let middleware = [thunkMiddleware]
if (process.env.WEBPACK) {
    middleware = [...middleware, createLogger({collapsed: true})];
}

const store = createStore(
    combineReducers({
        CurrentPlayer,
        Players,
        Game,
        notifications: notificationsReducer(),
    }),
    applyMiddleware(
        ...middleware
    )
)

const gameActions = {
    createGame, joinGame, startGame, setGameState, setQuestion,
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
