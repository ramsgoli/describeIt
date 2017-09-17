const express = require('express')
const randomstring = require('randomstring')

let router = express.Router()
const { User, Game, Submission } = require('../../db')

/**
 * BODY: accessCode (optional)
 * If body contains accessCode, check if game exists, create new user, and add to game
 * if game does not exist, return an error
 * If body does NOT contain accessCode, create new User AND Game
 * FIRST create game, THEN create user
 */
router.post('/', (req, res) => {
    const userName = req.body.name
    const socketId = req.body.socketId

    //try to get the socket from the socketid
    const socket = req.io.sockets.connected[socketId]

    let accessCode

    if (req.body.accessCode) {
        // User wants to join an existing game
        accessCode = req.body.accessCode

        Game.findOne({
            where: {
                accessCode
            }
        }).then(game => {
            if (!game) {
                return res.status(404).json({error: 'No game found'})
            }

            if (game.getDataValue('gameState') === 'SUBMISSIONS_STATE') {
                // can't join game that has already begun
                return res.status(403).json({error: 'The specified game has already begun'})
            }

            // Add socket to the room by accessCode
            socket.join(accessCode)

            // Create a new user
            User.create({
                name: userName,
                socketId
            }).then(user => {
                user.setGame(game)

                // let all other sockets know that a new player has joined
                socket.broadcast.to(accessCode).emit('newPlayer', user.toJSON())

                //get all other players in this game
                return user.getOtherPlayers()
            }).then(players => {
                return res.json({
                    accessCode,
                    players: players.map(player => player.public())
                })
            })
        })
    } else {
        // User wants to create a new game. Generate an access code
        accessCode = randomstring.generate({
            capitalization: 'lowercase',
            charset: 'alphabetic',
            length: 5
        })

        // Add socket to the room by accessCode
        socket.join(accessCode)

        Game.create({
            accessCode
        }).then(game => {

            User.create({
                name: userName,
                socketId
            }).then(user => {
                user.setGame(game)

                return res.json({
                    accessCode,
                    user: user.public()
                })
            })
        })
    }
})

router.post('/:id/submissions', (req, res) => {
    const submission = req.body.submission
    if (!submission) {
        return res.status(403).json({error: 'No submission provided'})
    }

    User.findOne({
       where: {
           id: req.params.id
       }
    }).then(user => {
        if (!user) {
            return res.status(404).json({error: 'No user found'})
        }

        Submission.create({
            text: submission
        }).then(submission => {
            submission.setUser(user)

            return res.json({
                submission: submission.public()
            })
        })
    })
})


module.exports = router