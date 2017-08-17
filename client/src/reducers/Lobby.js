import { fromJS } from 'immutable'

import Config from '../config'
import handleErrors from './Errors'

/*
Constants
 */

const START_GAME_START = Symbol('START_GAME_START')
const START_GAME_SUCCESS = Symbol('START_GAME_SUCCESS')
const START_GAME_FAILURE = Symbol('START_GAME_FAILURE')

const NEW_PLAYER = Symbol('NEW_PLAYER')


/*
Actions
 */

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

export const newPlayer = (player) => {
    return {
        type: NEW_PLAYER,
        player
    }
}

export const startGame = (accessCode) => {
    return dispatch => {
        dispatch(startGameStart())

        fetch(`${Config.API_URL}/games`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accessCode
            })
        })
            .then(handleErrors)
            .then(dispatch(startGameSuccess()))
            .catch(error => {
                dispatch(startGameFailure(error))
            })
    }
}


/*
Reducers
 */

const initialState = fromJS({
    players: [],
    accessCode: '',
    _internal: {
        error: '',
        loading: false,
        success: false
    }
})

export const WaitingRoom = (state=initialState, action) => {
    switch(action.type) {
        case START_GAME_START: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'loading'], true)
            })
        }
        case START_GAME_SUCCESS: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'success'], true)
            })
        }
        case START_GAME_FAILURE: {
            const { error } = action
            return state.withMutations(val => {
                val.setIn(['_internal', 'error'], error)
            })
        }
        case NEW_PLAYER: {
            
        }
    }
}
