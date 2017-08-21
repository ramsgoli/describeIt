const Game = require('./Game')

module.exports = (db, Sequelize) => {
    const Submission = db.define('Submission', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: Sequelize.TEXT,
        },
        userID: {
            type: Sequelize.INTEGER,
            references: {
                model: Game,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE // check foreign key constraint immediately
            }
        }
    })

    return Submission
}