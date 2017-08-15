const https = require('https')
const http = require('http')

const app = require('express')()
const server = http.Server(app)
const io = require('socket.io')(server)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

io.on('connection', socket => {
    console.log('socket sonnected')
})

server.listen(8000, () => {
    console.log('listening on port 8000...')
})
