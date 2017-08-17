
export default {
    API_URL: process.env.NODE_ENV ? '/api' : 'http://localhost:8000/api',
    resources: {
        users: {
           foo: 'bar'
        }
    }
}