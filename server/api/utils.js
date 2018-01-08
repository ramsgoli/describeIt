const { User, Submission } = require('../db')
/*
 returns true if every player in this game has a submission
 */
const hasEveryoneSubmitted = (game) => {
    return new Promise((resolve, reject) => {
        User.findAll({
            where: {
                gameId: game.id
            }
        }).then(players => {
            // for each player, check if there is a submission with this playerId
            players.forEach((player, idx) => {
                Submission.findOne({
                    where: {
                        userId: player.id
                    }
                }).then(submission => {
                    // if there is no submission for this user, return false
                    if (!submission) {
                        return resolve(false)
                    }
                    if (idx === players.length - 1) {
                        // we have encountered a submission for each player. Resolve with true
                        resolve(true)
                    }
                })
            })
        })
    })
    // First get all players in this game
}

module.exports = {
    hasEveryoneSubmitted
}
