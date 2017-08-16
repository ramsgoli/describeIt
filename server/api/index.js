const express = require('express')
let router = express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to the api')
})

router.use('/users', require('./users'))

module.exports = router