const express = require('express')
const randomstring = require('randomstring')

let router = express.Router()
const { User, Game } = require('../../db')

/**
 * BODY: accessCode (optional)
 * If body contains accessCode, check if game exists, create new user, and add to game
 * if game does not exist, return an error
 * If body does NOT contain accessCode, create new User AND Game
 */
router.post('/', (req, res) => {
    const userName = req.body.name
    console.log('request from ', userName)
    let accessCode

    if (req.body.accessCode) {
        // User wants to join an existing game
        const { accessCode } = req.body
        Game.findOne({
            where: {
                accessCode
            }
        }).then(game => {
            if (!game) {
                return res.json({error: 'No game found'})
            }
        })

    }

})

module.exports = router