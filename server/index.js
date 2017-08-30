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

/*
midddlewares
 */

// attach io instance to every api request
app.use(function(req, res, next){
    req.io = io
    next()
})

app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:8080' // for development
}))
app.use(morgan('tiny')) // logging


app.get('/', (req, res) => {
    res.send('Hello World from Docker!')
})

app.use('/api', api)


server.listen(8000, () => {
    console.log('listening on port 8000...')
})
