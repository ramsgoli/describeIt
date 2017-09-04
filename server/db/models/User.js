
module.exports = (db, Sequelize) => {
    const User = db.define('user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.TEXT
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

    User.prototype.public = function() {
        return {
            name: this.name,
            id: this.id
        }
    }

    return User
}
