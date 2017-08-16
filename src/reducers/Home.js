import {fromJS} from 'immutable'
import Config from 'config'
import handleErrors from 'reducers/Errors'

// constants
const CREATE_GAME_START = Symbol('create_game_start')
const CREATE_GAME_SUCCESS = Symbol('create_game_success')
const CREATE_GAME_FAILURE = Symbol('create_game_failure')

const JOIN_GAME_START = Symbol('join_game_start')
const JOIN_GAME_SUCCESS = Symbol('join_game_success')
const JOIN_GAME_FAILURE = Symbol('join_game_failure')

// actions
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

export const joinGame = (name, accessCode) => {
    return dispatch => {
        dispatch(joinGameStart())

        fetch(`${Config.API_URL}/users/${accessCode}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
            })
        })
            .then(handleErrors)
            .then(resp => resp.json())
            .then(resp => dispatch(joinGameSuccess(resp.accessCode)))
            .catch(error => {
                dispatch(joinGameFailure(error.response))
            })
    }
}

export const createGame = ({name}) => {
    return dispatch => {
        dispatch(createGameStart())

        fetch(`${Config.API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name
            })
        })
            .then(handleErrors)
            .then(resp => resp.json())
            .then(resp => dispatch(createGameSuccess(resp.accessCode)))
            .catch(error => {
                dispatch(createGameFailure(error.response))
            })
    }
}

// reducer
const initialState = fromJS({
    _internal: {
        loading: false,
        error: [],
        success: false
    },
    accessCode: ''
})

export const Home = (state=initialState, action) => {
    switch(action.type) {
        case CREATE_GAME_START: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'loading'], true)
            })
        }
        case JOIN_GAME_START: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'loading'], true)
            })
        }
        case CREATE_GAME_SUCCESS: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'loading'], false)
                val.set('accessCode', action.accessCode)
                val.setIn(['_internal', 'success'], true)
            })
        }
        case JOIN_GAME_SUCCESS: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'loading'], false)
                val.set('accessCode', action.accessCode)
                val.setIn(['_internal', 'success'], true)
            })
        }
        case CREATE_GAME_FAILURE: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'loading'], false)
                val.setIn(['_internal', 'error'], action.error)
            })
        }
        case JOIN_GAME_FAILURE: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'loading'], false)
                val.setIn(['_internal', 'error'], action.error)
            })
        }
        default:
            return state
    }
}
