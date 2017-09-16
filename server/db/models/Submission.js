
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
    })

    /* Instance Level Methods */
    Submission.prototype.public = function() {
        return {
            id: this.id,
            text: this.text
        }
    }
    return Submission
}