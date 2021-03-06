const Sequelize = require('sequelize')

const Config = require('../config')

const questions = require('./questions.json');
const db = new Sequelize(Config.db.DB, Config.db.USER, Config.db.PASSWORD, {
    dialect: 'postgres',
    host: 'postgres',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
})

// require our models
const User = require('./models/User')(db, Sequelize);
const Game = require('./models/Game')(db, Sequelize);
const Submission = require('./models/Submission')(db, Sequelize);
const Question = require('./models/Question')(db, Sequelize);
const Vote = require('./models/Vote')(db, Sequelize);

// Define associations
User.belongsTo(Game) // User has a gameId attribute
Submission.belongsTo(User, { onDelete: 'cascade' }) // Submission has a userId attribute
Submission.belongsTo(Game);
Game.belongsTo(Question) // Game has a questionId attribute

Vote.belongsTo(User, { as: 'user', foreignKey: 'userId', onDelete: 'cascade'});  // Vote has a userId attribute
Vote.belongsTo(User, { as: 'userVotedFor', foreignKey: 'userVotedForId', onDelete: 'cascade'})
Vote.belongsTo(Submission, { onDelete: 'cascade'});

//Test connection
db
    .authenticate()
    .then(() => {
        console.log("dropping db");
        return db.drop();
    }).then(() => {
        const options = Config.development ? {force: true} : null;

        console.log("syncing db");
        return db.sync(options);
    }).then(() => {
        // initialize all questions
        for (let i = 0; i < questions.length; i++) {
            Question.create({
                text: questions[i]
            });
        }
    })
    .catch(error => {
        console.error(error)
    })

module.exports = { db, User, Game, Submission, Question, Vote }
