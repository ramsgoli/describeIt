import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { Home, createGame, joinGame } from 'reducers/Home'

const store = createStore(
    combineReducers({
        Home
    }),
    applyMiddleware(
        thunkMiddleware,
        createLogger({collapsed: true})
    )
)

const homeActions = {
    createGame, joinGame
}

export {store, homeActions}