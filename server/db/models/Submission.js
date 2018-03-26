
module.exports = (db, Sequelize) => {
    const Submission = db.define('submission', {
        id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
        },
        text: {
            type: Sequelize.TEXT,
        },
    })

    /* Instance Level Methods */
    Submission.prototype.public = function() {
        return {
            id: this.id,
            text: this.text,
            userId: this.userId
        }
    }
    return Submission
}