const express = require('express')
const randomstring = require('randomstring')

const { hasEveryoneSubmitted } = require('../utils');
const errors = require('../../errors');
const { User, Game, Submission } = require('../../db');

let router = express.Router()

/**
 * BODY: accessCode (optional)
 * If body contains accessCode, check if game exists, create new user, and add to game
 * if game does not exist, return an error
 * If body does NOT contain accessCode, create new User AND Game
 * FIRST create game, THEN create user
 */
router.post('/', async (req, res, next) => {
    const userName = req.body.name
    const socketId = req.body.socketId
    
    //try to get the socket from the socketid
    const socket = req.io.sockets.connected[socketId]
    if (!socket) {
        return next(new BadRequest("Socket ID was not matched"));
    }

    let accessCode

    if (req.body.accessCode) {
        // User wants to join an existing game
        accessCode = req.body.accessCode

        try {
            const game = await Game.findOne({
                where: {
                    accessCode
                }
            });
            if (!game) {
                return next(new errors.BadRequest("Game does not exist"));
            }

            if (game.getDataValue('gameState') === 'SUBMISSIONS_STATE') {
                // can't join game that has already begun
                return next(new errors.Forbidden("Game has already begin"));
            }

            // Add socket to the room by accessCode
            socket.join(accessCode)

            // Create a new user
            const newUser = await User.create({
                name: userName,
                socketId
            })

            newUser.setGame(game);

            // let all other sockets know that a new player has joined
            socket.broadcast.to(accessCode).emit('newPlayer', newUser.toJSON())

            // get all other users in this game
            const otherPlayers = await newUser.getOtherPlayers()

            return res.json({
                accessCode,
                players: otherPlayers.map(player => player.public()),
                currentPlayer: newUser.public()
            })
        } catch (e) {
            return next(new errors.InternalError());
        }
    } else {
        // User wants to create a new game. Generate an access code
        accessCode = randomstring.generate({
            capitalization: 'lowercase',
            charset: 'alphabetic',
            length: 5
        })

        // Add socket to the room by accessCode
        socket.join(accessCode)

        const game = await Game.create({
            accessCode
        });

        const user = await User.create({
            name: userName,
            socketId
        })

        user.setGame(game)

        return res.json({
            accessCode,
            currentPlayer: user.public()
        })
    }
})

router.post('/:id/submissions', async (req, res, next) => {
    const submissionText = req.body.submission

    const sockets = req.io.sockets.connected
    if (!submissionText) {
        return next(new errors.BadRequest('No submission provided'));
    }

    const user = await User.findOne({
        where: {
           id: req.params.id
        },
        include: [Game]
    });
    if (!user) {
        return next(new errors.NotFound('No user found'));
    }

    const game = user.game
    const socket = sockets[user.socketId]

    const submission = await Submission.create({
        text: submissionText
    })
    submission.setUser(user)

    socket.broadcast.to(game.accessCode).emit('newSubmission', submission.public())

    // check if everyone has submitted an answer for this game
    const submitted = await hasEveryoneSubmitted(game);
    console.log(submitted)
    if (submitted) {
        game.acceptVotes()
        req.io.to(game.accessCode).emit('setGameState', game.getDataValue('gameState'))
    }

    res.json({
        submission: submission.public()
    })
})


module.exports = router
