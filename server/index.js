const https = require('https')
const http = require('http')

const app = require('express')()
const server = http.Server(app)
const io = require('socket.io')(server)

const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const api = require('./api')
const db = require('./db')

// midddlewares
app.use(bodyParser.json())
app.use(cors({
    origin: 'http://localhost:8080'
}))
app.use(morgan('tiny'))


app.get('/', (req, res) => {
    res.send('Hello World from Docker!')
})

app.use('/api', api)

io.on('connection', socket => {
    console.log('socket sonnected')
})

server.listen(8000, () => {
    console.log('listening on port 8000...')
})
