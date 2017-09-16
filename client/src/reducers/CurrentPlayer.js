import { fromJS } from 'immutable'
import Config from '../config'
/*
CONSTANTS
 */

const SET_PLAYER_NAME = Symbol('SET_PLAYER_NAME')
const SET_SOCKET_ID = Symbol('SET_SOCKET_ID')

const ADD_SUBMISSION = Symbol('ADD_SUBMISSION')

/*
ACTIONS
 */

export const setPlayerName = (name) => {
    return {
        type: SET_PLAYER_NAME,
        name
    }
}

export const setSocketId = (id) => {
    return {
        type: SET_SOCKET_ID,
        id
    }
}


export const addSubmission = submission => (dispatch, getState) => {
    const Game = getState().Game
    const accessCode = Game.get('accessCode')
    const socketId = Game.get('socketId')

    fetch(`${Config.API_URL}/users/${accessCode}/submissions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            accessCode,
            socketId,
            submission
        })
    })
}

/*
 REDUCERS
 */

const initialState = fromJS({
    id: null,
    socketId: '',
    name: '',
    submissions: []
})


export const CurrentPlayer = (state=initialState, action) => {
    switch (action.type) {
        case SET_SOCKET_ID: {
            return state.withMutations(val => {
                 val.set('socketId', action.id)
            })
        }
        case SET_PLAYER_NAME: {
            return state.withMutations(val => {
                val.set('name', action.name)
            })
        }

        case ADD_SUBMISSION: {
            return state.withMutations(val => {
                val.set('submissions', val.get('submissions').push(action.submission))
            })
        }

        default:
            return state
    }
}

