const express = require('express')
let router = express.Router()

router.post('/', (req, res) => {
    /*
    TODO: create a new user, check if game exists, and add him to game
     */
    console.log('request from ', req.body.name)
    if (!req.body.accessCode) {
        res.json({accessCode: 'random'})
    } else {
        res.json({accessCode: req.body.accessCode})
    }
})

module.exports = router