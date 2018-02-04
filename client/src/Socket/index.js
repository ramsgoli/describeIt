import io from 'socket.io-client'

import { store, playerActions, gameActions } from '../reducers'

class SocketManager {
    constructor() {
        this.socket = io.connect('http://localhost:8000')

        this.socket.on('newPlayer', this.onNewPlayer)
        this.socket.on('removePlayer', this.removePlayer)
        this.socket.on('setGameState', this.setGameState)
        this.socket.on('newSubmission', this.onNewSubmission)
        this.socket.on('setQuestion', this.setQuestion);
    }

    emit = (event, data) => {
        this.socket.emit(event, data)
    }

    onNewPlayer = (newPlayer) => {
        store.dispatch(playerActions.addPlayer(newPlayer))
    }

    removePlayer = (player) => {
        store.dispatch(playerActions.removePlayer(player))
    }

    setGameState = (state) => {
        store.dispatch(gameActions.setGameState(state))
    }

    onNewSubmission = (submission) => {
        store.dispatch(playerActions.addPlayerSubmission(submission))
    }

    setQuestion = (question) => {
        console.log(question);
        store.dispatch(gameActions.setQuestion(question));
    }
}

export default new SocketManager()
