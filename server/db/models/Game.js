const config = require('../../config');

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
            values: Object.keys(config.gameStates),
            defaultValue: "LOBBY_STATE",
        }
    })

    /*
    Instance-level methods
     */

    Game.prototype.startGame = function(question) {
        this.gameState = config.gameStates.SUBMISSIONS_STATE;
        this.setQuestion(question);
        // Persist the data by calling save()
        this.save();
    }

    Game.prototype.acceptVotes = function() {
        this.gameState = config.gameStates.VOTING_STATE;
        // Persist the data by calling save()
        this.save();
    }

    Game.prototype.generateResults = function() {
        this.gameState = config.gameStates.CALCULATING_STATE;
    }

    return Game
}
