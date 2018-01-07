
export default {
    API_URL: process.env.WEBPACK ? 'http://localhost:8000/api' : '/api', 
    resources: {
        users: {
           foo: 'bar'
        }
    }
}
