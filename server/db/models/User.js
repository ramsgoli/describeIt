
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

    return User
}
