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

        game.startGame()
        return res.json({game: game.toJSON()})
    })
})

module.exports = router