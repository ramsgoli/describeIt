const express = require('express')

let router = express.Router()
const { Game, User } = require('../../db')


/**
 * BODY: accessCode, socketId
 * post to /game with the accessCode to start the game (ie put into Submissions state)
 */
router.post('/', (req, res) => {

    const accessCode = req.body.accessCode
    const socketId = req.body.socketId

    socket = req.io.sockets.connected[socketId]

    if (!accessCode) {
        return res.status(400).json({error: 'No access code provided'})
    }

    Game.findOne({
        where: {
            accessCode
        }
    }).then(game => {
        if (!game) {
            return res.status(404).json({error: 'Specified game was not found'})
        }

        if (game.getDataValue('gameState') === 'SUBMISSIONS_STATE') {
            // game has already begun
            res.status(403).json({eror: 'Specified game has alredy begun'})
        }

        // set game state to SUBMISSIONS_STATE
        game.startGame()

        // tell other players in game that game has started
        socket.broadcast.to(accessCode).emit('setGameState', 'SUBMISSIONS_STATE')

        return res.json({game: game.toJSON()})
    })
})

router.post('/:accessCode/submissions', (req, res) => {
    Game.findOne({
        where: {
            accessCode
        }
    }).then(game => {
        if (!game) {
            return res.status(404).json({error: 'Specified game was not found'})
        }

        if (game.getDataValue('gameState') !== 'VOTING_STATE') {
            res.status(403).json({error: 'No submissions allowed'})
        }


    })
})

router.get('/', (req, res) => {
    Game.findAll().then(games => {
        return res.json({games: games})
    })
})

module.exports = router