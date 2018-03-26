module.exports = (db, Sequelize) => {
    const Vote = db.define('vote', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4,
        },
        userId: {
            type: Sequelize.UUID
        },
        submissionId: {
            type: Sequelize.UUID
        },
        userVotedForId: {
            type: Sequelize.UUID
        }
    })
    return Vote;
}