import {fromJS} from 'immutable'
import Config from 'config'
import handleErrors from 'reducers/Errors'

// constants
const CREATE_GAME_START = fromJS('create_game_start')
const CREATE_GAME_SUCCESS = fromJS('create_game_success')
const CREATE_GAME_FAILURE = fromJS('create_game_failure')

const JOIN_GAME_START = fromJS('join_game_start')
const JOIN_GAME_SUCCESS = fromJS('join_game_success')
const JOIN_GAME_FAILURE = fromJS('join_game_failure')

// actions
export const createGameStart = () => {
    return {
        type: CREATE_GAME_START
    }
}

export const createGameSuccess = () => {
    return {
        type: CREATE_GAME_SUCCESS
    }
}

export const createGameFailure = (errors) => {
    return {
        type: CREATE_GAME_FAILURE,
        errors
    }
}

export const joinGameStart = () => {
    return {
        type: JOIN_GAME_START
    }
}

export const joinGameSuccess = () => {
    return {
        type: JOIN_GAME_SUCCESS
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

        fetch(`${Config.API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                accessCode
            })
        })
            .then(handleErrors)
            .then(resp => resp.json())
            .catch(error => {
                dispatch(joinGameFailure(error.response))
            })
    }
}

export const createGame = ({name}) => {
    return dispatch => {
        dispatch(createGameStart())


    }
}

// reducer
const initialState = fromJS({
    _internal: {
        loading: false,
        error: []
    },
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
            })
        }
        case JOIN_GAME_SUCCESS: {
            return state.withMutations(val => {
                val.setIn(['_internal', 'loading'], false)
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
