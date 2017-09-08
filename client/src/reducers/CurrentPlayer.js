import { fromJS } from 'immutable'
import Config from '../config'
/*
CONSTANTS
 */

const SET_PLAYER_NAME = Symbol('SET_PLAYER_NAME')

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

/*
export const addSubmission = (submission) => {
    return {
        type: ADD_SUBMISSION,
        submission
    }
}
*/

/*
REDUCERS
 */

export const addSubmission = submission => (dispatch, getState) => {
    const Game = getState().Game
    const accessCode = Game.get('accessCode')
    const socketId = Game.get('socketId')

    fetch(`${Config.API_URL}/games/${accessCode}/submissions`, {
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

const initialState = fromJS({
    name: '',
    submissions: []
})


export const CurrentPlayer = (state=initialState, action) => {
    switch (action.type) {
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

