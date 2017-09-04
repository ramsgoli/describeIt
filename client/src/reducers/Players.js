import { fromJS } from 'immutable'

/*
CONSTANTS
 */
const ADD_PLAYER = Symbol('ADD_PLAYER')
const REMOVE_PLAYER = Symbol('REMOVE_PLAYER')

const SET_PLAYERS = Symbol('SET_PLAYERS')


/*
ACTIONS
 */

export const addPlayer = (player) => {
    return {
        type: ADD_PLAYER,
        player
    }
}

export const setPlayers = (players) => {
    return {
        type: SET_PLAYERS,
        players
    }
}

export const removePlayer = (player) => {
    return {
        type: REMOVE_PLAYER,
        player
    }
}


/*
REDUCERS
 */

//Example of player object
/*
player: {
    name: '',
    submissions: []
}
 */

const initialState = fromJS({
    players: [

    ]
})

export const Players = (state=initialState, action) => {
    switch(action.type) {
        case ADD_PLAYER: {
            return state.withMutations(val => {
                val.set('players', val.get('players').push(fromJS(action.player)))
            })
        }
        case SET_PLAYERS: {
            return state.withMutations(val => {
                val.set('players', fromJS(fromJS(action.players)))
            })
        }
        case REMOVE_PLAYER: {
            return state.withMutations(val => {
               val.set('players', val.get('players').filter(player => player.get('id') !== action.player.id))
            })
        }
        default:
            return state
    }
}

