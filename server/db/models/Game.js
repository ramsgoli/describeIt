module.exports = (db, Sequelize) => {
    const Game = db.define('Game', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        accessCode: {
            type: Sequelize.STRING
        }
    })

    return Game
}