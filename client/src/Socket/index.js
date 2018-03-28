import io from 'socket.io-client'

import { store, Actions } from '../reducers'

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
        store.dispatch(Actions.playerActions.addPlayer(newPlayer))
    }

    removePlayer = (player) => {
        store.dispatch(Actions.playerActions.removePlayer(player))
    }

    setGameState = (state) => {
        store.dispatch(Actions.gameActions.setGameState(state))
    }

    onNewSubmission = (submission) => {
        store.dispatch(Actions.playerActions.addPlayerSubmission(submission))
    }

    setQuestion = (question) => {
        console.log(question);
        store.dispatch(Actions.gameActions.setQuestion(question));
    }
}

export default new SocketManager()
