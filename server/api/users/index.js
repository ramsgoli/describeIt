const express = require('express')
const randomstring = require('randomstring')

const { hasEveryoneSubmitted, hasEveryoneVoted, calculateWinners } = require('../utils');
const errors = require('../../errors');
const config = require('../../config');
const { User, Game, Submission, Vote } = require('../../db');

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
        return next(new errors.BadRequest("Socket ID was not matched"));
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

            if (game.getDataValue('gameState') !== 'LOBBY_STATE') {
                // can't join game that is not in lobby 
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
    await submission.setGame(game);
    await submission.setUser(user);  // pause execution until user is set, becuase we use
                                    // this assocation to check hasEveryoneSubmitted

    socket.broadcast.to(game.accessCode).emit('newSubmission', submission.public())

    // check if everyone has submitted an answer for this game
    const submitted = await hasEveryoneSubmitted(game);
    if (submitted) {
        game.acceptVotes()
        req.io.to(game.accessCode).emit('setGameState', game.getDataValue('gameState'))
    }

    res.json({
        submission: submission.public()
    })
})

/*
body:
[{
    submissionID: <submissionID>,
    userID: <userID>
},]
*/
router.post('/:id/votes', async (req, res, next) => {
    try {
        if (!req.body.votes) {
            return next(new errors.BadRequest('No votes provided'));
        }
        const sockets = req.io.sockets.connected

        const user = await User.findOne({
            where: {
                id: req.params.id
            },
            include: [Game]
        });
        if (!user) {
            return next(new errors.NotFound('No user found'));
        }
        
        const votes = req.body.votes; 
        for (let i = 0; i < votes.length; i++) {
            const submission = await Submission.findOne({
                where: {
                    id: votes[i].submissionId
                }
            });
            if (!submission) {
                return next(new errors.NotFound(`Submission id: ${votes[i].submissionId} not found`));
            }

            const userVotedFor = await User.findOne({
                where: {
                    id: votes[i].userId
                }
            });
            if (!userVotedFor) {
                return next(new errors.NotFound(`User id: ${votes[i].submissionId} not found`));
            }

            const vote = await Vote.create();
            await vote.setUser(user);
            await vote.setUserVotedFor(userVotedFor);
            await vote.setSubmission(submission);
        }
        res.status(200).end();

        // check if everyone has submitted their votes
        const everyoneVoted = await hasEveryoneVoted(user.gameId);
        if (everyoneVoted) {
            const results = await calculateWinners(user.gameId);
            req.io.to(user.game.accessCode).emit('results', results);
            req.io.to(user.game.accessCode).emit('setGameState', 'RESULTS_STATE');
        }

    } catch (err) {
        console.error(err);
        return next(new errors.InternalError());
    }
})


module.exports = router
