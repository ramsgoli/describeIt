const express = require('express')
const randomstring = require('randomstring')

let router = express.Router()
const { User, Game } = require('../../db')

/**
 * BODY: accessCode (optional)
 * If body contains accessCode, check if game exists, create new user, and add to game
 * if game does not exist, return an error
 * If body does NOT contain accessCode, create new User AND Game
 * FIRST create game, THEN create user
 */
router.post('/', (req, res) => {
    const userName = req.body.name
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
            } else {
                // Create a new user
                User.create({
                    name: userName
                }).then(user => {
                    user.setGame(game)
                })
            }
        }).then(() => {
            return res.json({accessCode})
        })
    } else {
        accessCode = randomstring.generate({
            length: 5
        })

        Game.create({
            accessCode
        }).then(game => {
            User.create({
                name: userName
            }).then(user => {
                user.setGame(game)
            })
        }).then(() => {
            res.json({accessCode})
        })
    }

})

module.exports = router