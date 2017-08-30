module.exports = (db, Sequelize) => {
    const Game = db.define('game', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        accessCode: {
            type: Sequelize.STRING
        },
        gameState: {
            type: Sequelize.STRING,
            defaultValue: 'LOBBY_STATE',
            validate: {
                isIn: [[
                    'ERROR_STATE',
                    'LOBBY_STATE',
                    'SUBMISSIONS_STATE',
                    'VOTING_STATE'
                ]]
            }
        }
    })

    /*
    Instance-level methods
     */

    Game.prototype.startGame = function() {
        this.setDataValue('gameState', 'SUBMISSIONS_STATE')
    }

    return Game
}