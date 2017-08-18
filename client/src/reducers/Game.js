/*
THIS FILE MANAGES GENERAL GAME STATE
 */

/*
Game states
 */

const LOBBY_STATE = Symbol('LOBBY_STATE')
const ACCEPTING_SUBMISSIONS = Symbol('ACCEPTING_SUBMISSIONS')
const ACCEPTING_VOTES = Symbol('ACCEPTING_VOTES')

import { fromJS } from 'immutable'

const initialState = fromJS({
    accessCode: '',
    gameState: LOBBY_STATE
})