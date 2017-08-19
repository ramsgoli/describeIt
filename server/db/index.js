const Sequelize = require('sequelize')

const db = new Sequelize(process.env.DATABASE_URL)

//Test connection
db
    .authenticate()
    .then(() => {
        console.log('Connected to DB')
    })
    .catch(error => {
        console.log(error)
    })

const User = require('./User')(db, Sequelize)

//Test User
User.sync().then(() => {
    return User.create({
        firstName: 'Ram',
        lastName: 'Goli'
    })
})

User.findAll().then(users => {
    console.log(users)
})

module.exports = db