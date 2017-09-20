const gameStates = {
    ERROR_STATE: 'ERROR_STATE',
    LOBBY_STATE: 'LOBBY_STATE',
    SUBMISSIONS_STATE: 'SUBMISSIONS_STATE',
    VOTING_STATE: 'VOTING_STATE'
}

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
            isIn: [
                Object.keys(gameStates)
            ]
        }
    })

    /*
    Instance-level methods
     */

    Game.prototype.startGame = function() {
        this.setDataValue('gameState', gameStates.SUBMISSIONS_STATE)
        // Persist the data by calling save()
        this.save()
    }

    Game.prototype.acceptVotes = function() {
        this.setDataValue('gameState', gameStates.VOTING_STATE)
        // Persist the data by calling save()
        this.save()
    }

    return Game
}