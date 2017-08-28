
module.exports = (db, Sequelize) => {
    const User = db.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        socketId: {
            type: Sequelize.STRING
        }
    });

    /*
    Class level methods
     */
    User.getPlayersInGame = function(accessCode) {
        return this.findAll({
            where: {
                accessCode
            }
        })
    }

    /*
    Instance level Methods
     */
    User.prototype.getOtherPlayers = function() {
        return User.findAll({
            where: {
                gameId: this.gameId,
                id: {
                    $not: this.id
                }
            }
        })
    }

    return User
}
