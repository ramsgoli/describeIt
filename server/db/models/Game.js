module.exports = (db, Sequelize) => {
    const Game = db.define('game', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessCode: {
            type: Sequelize.STRING
        }
    })

    return Game
}