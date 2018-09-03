export default {
  API_URL: process.env.WEBPACK ? 'http://localhost:8000/api' : '/api' ,
  WS_URL: process.env.WEBPACK ? 'http://localhost:8000' : '/socket.io'
}
