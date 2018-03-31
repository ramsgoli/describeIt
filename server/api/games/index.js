const express = require('express')
const Sequelize = require('sequelize');

let router = express.Router()
const { Game, User, Question } = require('../../db');
const errors = require('../../errors');
const { mapQuestion } = require('../utils');


/**
 * BODY: accessCode, socketId
 * post to /game with the accessCode to start the game (ie put into Submissions state)
 */
router.post('/', async (req, res, next) => {

    const accessCode = req.body.accessCode
    const socketId = req.body.socketId

    socket = req.io.sockets.connected[socketId]

    if (!accessCode) {
        return next(new errors.BadRequest("No access code provided"));
    }

    if (!socket) {
        return next(new errors.BadRequest("No matching socket"));
    }

    const game = await Game.findOne({
        where: {
            accessCode
        }
    });

    if (!game) {
        return next(new errors.NotFound("The specified game was not found"));
    }

    if (game.getDataValue('gameState') !== 'LOBBY_STATE') {
        // game has already begun
        return next(new errors.Forbidden("The game has already begun")); 
    }

    // set game state to SUBMISSIONS_STATE
    // and assign a random question
    const question = await Question.find({
        order: [
            Sequelize.fn('RANDOM')
        ], 
    });
    game.startGame(question)
    const mappedQuestion = await mapQuestion(question.text, game.id);

    // tell other players in game that game has started
    socket.broadcast.to(accessCode).emit('setGameState', 'SUBMISSIONS_STATE')
    socket.broadcast.to(accessCode).emit('setQuestion', mappedQuestion);

    return res.json({game: game.toJSON(), question: mappedQuestion})
})

router.get('/', (req, res) => {
    Game.findAll().then(games => {
        return res.json({games: games})
    })
})

module.exports = router
