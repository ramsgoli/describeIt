import handleErrors from './Errors'
import { fromJS } from 'immutable'
import { addNotification as notify } from 'reapop'

import Config from '../config'

import { setPlayerName } from './CurrentPlayer'
import { setPlayers } from './Players'

/*
THIS FILE MANAGES GENERAL GAME STATE
 */

/*
Game states
 */

const ERROR_STATE = 'ERROR_STATE'
const NULL_STATE = 'NULL_STATE'
const LOBBY_STATE = 'LOBBY_STATE'
const ACCEPTING_SUBMISSIONS = 'ACCEPTING_SUBMISSIONS'
const ACCEPTING_VOTES = 'ACCEPTING_VOTES'
export const gameStates = {ERROR_STATE, NULL_STATE, LOBBY_STATE, ACCEPTING_SUBMISSIONS, ACCEPTING_VOTES}


// constants
const CREATE_GAME_START = Symbol('CREATE_GAME_START')
const CREATE_GAME_SUCCESS = Symbol('CREATE_GAME_SUCCESS')
const CREATE_GAME_FAILURE = Symbol('CREATE_GAME_FAILURE')

const JOIN_GAME_START = Symbol('JOIN_GAME_START')
const JOIN_GAME_SUCCESS = Symbol('JOIN_GAME_SUCCESS')
const JOIN_GAME_FAILURE = Symbol('JOIN_GAME_FAILURE')

const START_GAME_START = Symbol('START_GAME_START')
const START_GAME_SUCCESS = Symbol('START_GAME_SUCCESS')
const START_GAME_FAILURE = Symbol('START_GAME_FAILURE')

const SET_SOCKET_ID = Symbol('SET_SOCKET_ID')

/*
Actions
 */


export const createGameStart = () => {
    return {
        type: CREATE_GAME_START
    }
}

export const createGameSuccess = (accessCode) => {
    return {
        type: CREATE_GAME_SUCCESS,
        accessCode
    }
}

export const createGameFailure = (error) => {
    return {
        type: CREATE_GAME_FAILURE,
        error
    }
}

export const joinGameStart = () => {
    return {
        type: JOIN_GAME_START
    }
}

export const joinGameSuccess = (accessCode) => {
    return {
        type: JOIN_GAME_SUCCESS,
        accessCode
    }
}

export const joinGameFailure = (error) => {
    return {
        type: JOIN_GAME_FAILURE,
        error
    }
}

const startGameStart = () => {
    return {
        type: START_GAME_START
    }
}

const startGameSuccess = () => {
    return {
        type: START_GAME_SUCCESS
    }
}

const startGameFailure = (error) => {
    return {
        type: START_GAME_FAILURE,
        error
    }
}

export const setSocketId = (id) => {
    return {
        type: SET_SOCKET_ID,
        id
    }
}

export const joinGame = (name, accessCode) => {
    return (dispatch, getState) => {
        dispatch(setPlayerName(name))

        const { Game } = getState()

        fetch(`${Config.API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                accessCode,
                socketId: Game.get('socketId')
            })
        })
            .then(handleErrors)
            .then(resp => resp.json())
            .then(resp => {
                dispatch(notify({message: `You joined the game ${resp.accessCode}`, status: 'success', position: 'tc'}))
                dispatch(setPlayers(resp.players))
                dispatch(joinGameSuccess(resp.accessCode))
            })
            .catch(error => {
                dispatch(notify({message: `The game ${accessCode} does not exist`, status: 'error', position: 'tc'}))
            })
    }
}

export const createGame = (name) => {
    return (dispatch, getState) => {
        dispatch(setPlayerName(name))

        const { Game } = getState()

        fetch(`${Config.API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                socketId: Game.get('socketId')
            })
        })
            .then(handleErrors)
            .then(resp => resp.json())
            .then(resp => {
                dispatch(notify({message: `You joined the game ${resp.accessCode}`, status: 'success', position: 'tc'}))
                dispatch(createGameSuccess(resp.accessCode))
            })
            .catch(error => {
                dispatch(createGameFailure(error.response))
            })
    }
}

export const startGame = () => {
    return (dispatch, getState) => {

        const { Game } = getState()

        fetch(`${Config.API_URL}/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessCode: Game.get('accessCode')
            })
        })
            .then(handleErrors)
            .then(dispatch(startGameSuccess()))
            .catch(error => {
                dispatch(startGameFailure(error))
            })
    }
}

const initialState = fromJS({
    accessCode: '',
    socketId: '',
    gameState: NULL_STATE,
    _internal: {
        loading: false,
        errors: []
    }
})

export const Game = (state=initialState, action) => {
    switch(action.type) {
        case CREATE_GAME_START:
        case JOIN_GAME_START: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'loading'], true)
            })
        }
        case CREATE_GAME_SUCCESS: {
            return state.withMutations(val => {
                val.set('accessCode', action.accessCode)
                val.set('gameState', LOBBY_STATE)
            })
        }
        case JOIN_GAME_SUCCESS: {
            return state.withMutations(val => {
                val.set('accessCode', action.accessCode)
                val.set('gameState', LOBBY_STATE)
            })
        }
        case CREATE_GAME_FAILURE: {
            return state.withMutations(val => {
                val.set('gameState', ERROR_STATE)
                val.setIn(['_internal', 'errors'], val.getIn(['_internal', 'errors']).push(action.error))
            })
        }
        case JOIN_GAME_FAILURE: {
            return state.withMutations(val => {
                val.set('gameState', ERROR_STATE)
                val.setIn(['_internal', 'errors'], val.getIn(['_internal', 'errors']).push(action.error))
            })
        }
        case SET_SOCKET_ID: {
            return state.withMutations(val => {
                val.set('socketId', action.id)
            })
        }
        default:
            return state
    }
}