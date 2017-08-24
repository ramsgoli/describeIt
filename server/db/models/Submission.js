
module.exports = (db, Sequelize) => {
    const Submission = db.define('submission', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        text: {
            type: Sequelize.TEXT,
        },
        userID: {
            type: Sequelize.INTEGER,
        }
    })

    return Submission
}