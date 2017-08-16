const express = require('express')
let router = express.Router()

router.post('/', (req, res) => {
    /*
    TODO: create a new user and game
     */
    res.json({accessCode: 'abcde'})
})

router.post('/:accessCode', (req, res) => {
    /*
    TODO: create a new user, check if game exists, and add him to game
     */
    res.json({accessCode: req.params.accessCode})
})

module.exports = router