const Sequelize = require('sequelize')
const Config = require('../config').db
const setup = require('./setup')

const questions = require('./questions.json');
const db = new Sequelize(Config.DB, Config.USER, Config.PASSWORD, {
    dialect: 'postgres',
    host: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
})

//Test connection
db
    .authenticate()
    .then(() => {
        setup(db)
    })
    .catch(error => {
        console.log(error)
    })

const User = require('./models/User')(db, Sequelize)
const Game = require('./models/Game')(db, Sequelize)
const Submission = require('./models/Submission')(db, Sequelize)
const Question = require('./models/Question')(db, Sequelize)

// Define associations
User.belongsTo(Game) // User has a gameId attribute
Submission.belongsTo(User) // Submission has a userId attribute
Question.hasOne(Game) // Game has a questionId attribute

// initialize all questions
for (let i = 0; i < questions.length; i++) {
    Promise.resolve(
        Question.create({
            text: questions[i]
        })
    )
}

module.exports = { db, User, Game, Submission, Question }
