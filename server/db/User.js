module.exports = (db, Sequelize) => {
    const User = db.define('user', {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        }
    });

    return User
}
