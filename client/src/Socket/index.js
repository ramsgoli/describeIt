import io from 'socket.io-client'

class SocketManager {
    constructor() {
        this.socket = io.connect('http://localhost:8000')
    }

    emit = (event, data) => {
        this.socket.emit(event, data)
    }
}

export default new SocketManager()