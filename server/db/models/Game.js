const gameStates = {
    ERROR_STATE: 'ERROR_STATE',
    LOBBY_STATE: 'LOBBY_STATE',
    SUBMISSIONS_STATE: 'SUBMISSIONS_STATE',
    VOTING_STATE: 'VOTING_STATE',
    CALCULATING_STATE: 'CALCULATING_STATE',
    RESULTS_STATE: 'RESULTS_STATE',
}

module.exports = (db, Sequelize) => {
    const Game = db.define('game', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
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

    Game.prototype.generateResults = function() {
        this.gameState = gameStates.CALCULATING_STATE;
    }

    return Game
}
