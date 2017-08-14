import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import { Home, createGameStart } from 'reducers/Home'

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
    createGameStart
}

export {store, homeActions}