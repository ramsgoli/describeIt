const socketio = require('socket.io')
const { User, Game } = require('../db')

module.exports = server => {
    const io = socketio(server)

    io.on('connection', socket => {
        console.log(`${socket.id} connected`)

        socket.on('disconnect', () => {
            // Get the user corresponding to this socketid
            User.findOne({
                where: {
                    socketId: socket.id
                },
                include: [Game]
            }).then(user => {
                socket.broadcast.to(user.game.accessCode).emit('removePlayer', user.toJSON())

                //delete row from db
                user.destroy()
            })
        })
    })

    return io
}
