const https = require('https')
const http = require('http')

const app = require('express')()
const server = http.Server(app)
const io = require('./socket')(server)

const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const api = require('./api')
const db = require('./db')
const errors = require('./errors')

/*
midddlewares
 */

// attach io instance to every api request
app.use(function(req, res, next){
    req.io = io
    next()
})

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('tiny')) // logging

app.use('/api', api);

app.use(errors.errorHandler);

server.listen(8000, () => {
    console.log('listening on port 8000...')
})
