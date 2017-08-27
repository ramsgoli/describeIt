import io from 'socket.io-client'

import { store, playerActions } from '../reducers'

class SocketManager {
    constructor() {
        this.socket = io.connect('http://localhost:8000')

        this.socket.on('newPlayer', this.onNewPlayer)
    }

    emit = (event, data) => {
        this.socket.emit(event, data)
    }

    onNewPlayer = (newPlayer) => {
        store.dispatch(playerActions.addPlayer(newPlayer))
    }
}

export default new SocketManager()