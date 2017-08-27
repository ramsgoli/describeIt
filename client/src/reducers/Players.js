import { fromJS } from 'immutable'

/*
CONSTANTS
 */
const ADD_PLAYER = Symbol('ADD_PLAYER')


/*
ACTIONS
 */

export const addPlayer = (player) => {
    return {
        type: ADD_PLAYER,
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
                val.set('players', val.get('players').push(action.player))
            })
        }
        default:
            return state
    }
}

