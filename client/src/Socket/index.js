import io from 'socket.io-client';

import Config from '../config';
import { store, Actions, gameStates } from '../reducers';

class SocketManager {
    constructor() {
        this.socket = io(Config.WS_URL)

        this.socket.on('newPlayer', this.onNewPlayer)
        this.socket.on('removePlayer', this.removePlayer)
        this.socket.on('setGameState', this.setGameState)
        this.socket.on('newSubmission', this.onNewSubmission)
        this.socket.on('setQuestion', this.setQuestion);
        this.socket.on('results', this.onResults);
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
        store.dispatch(Actions.gameActions.setQuestion(question));
    }

    onResults = (results) => {
        store.dispatch(Actions.voteActions.setResults(results));
    }
}

export default new SocketManager()
