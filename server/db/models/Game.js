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
            type: Sequelize.ENUM,
            values: Object.keys(gameStates),
            defaultValue: "LOBBY_STATE",
        }
    })

    /*
    Instance-level methods
     */

    Game.prototype.startGame = function(question) {
        this.gameState = gameStates.SUBMISSIONS_STATE;
        this.setQuestion(question);
        // Persist the data by calling save()
        this.save();
    }

    Game.prototype.acceptVotes = function() {
        this.gameState = gameStates.VOTING_STATE;
        // Persist the data by calling save()
        this.save();
    }

    return Game
}
