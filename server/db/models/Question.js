const questions = require('../questions.json');

module.exports = (db, Sequelize) => {
    const Question = db.define('question', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: Sequelize.TEXT
        }
    })

    // initialize all questions
    for (let i = 0; i < questions.length; i++) {
        Question.create({
            text: questions[i]
        });
    }

    return Question
}
