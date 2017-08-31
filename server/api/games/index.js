const express = require('express')

let router = express.Router()
const { Game, User } = require('../../db')

router.post('/', (req, res) => {
    const accessCode = req.body.accessCode
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

        // set game state to SUBMISSIONS_STATE
        game.startGame()
        return res.json({game: game.toJSON()})
    })
})

router.get('/', (req, res) => {
    Game.findAll().then(games => {
        return res.json({games: games})
    })
})

module.exports = router