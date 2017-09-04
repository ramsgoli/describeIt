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

    return Question
}