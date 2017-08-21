const Game = require('./Game')

module.exports = (db, Sequelize) => {
    const User = db.define('User', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        gameId: {
            type: Sequelize.INTEGER,
            references: {
                model: Game,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE // check foreign key constraint immediately
            }
        }
    });

    return User
}
