const { User, Submission } = require('../db')
/*
 returns true if every player in this game has a submission
 */
const hasEveryoneSubmitted = async (game) => {
    const players = await User.findAll({
        where: {
            gameId: game.id
        }
    })

    for (let i = 0; i < players.length; i++) {
        const submission = await Submission.findOne({
            where: {
                userId: players[i].id
            }
        })

        if (!submission) {
            return false;
        }
    }
    return true;
}

module.exports = {
    hasEveryoneSubmitted
}
