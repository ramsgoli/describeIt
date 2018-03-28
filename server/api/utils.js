const { User, Submission, Vote } = require('../db')
/*
 returns true if every player in this game has a submission
 */
const hasEveryoneSubmitted = async (game) => {
    try {
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
    } catch (err) {
        // shouldn't happen but oh well..
        return false;
    }
}

const hasEveryoneVoted = async gameId => {
    try {
        const players = await User.findAll({
            where: {
                gameId
            }
        })

        for (let i = 0; i < players.length; i++) {
            const vote = await Vote.findOne({
                where: {
                    userId: players[i].id
                }
            })

            if (!vote) {
                return false;
            }
        }
        return true;
    } catch (err) {
        return false;
    }
}

const calculateWinners = async gameId => {
    let results = {};

    try {
        
        const users = await User.findAll({
            where: {
                gameId
            }
        });

        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            results[user.name] = 0;

            const votes = await Vote.findAll({
                where: {
                    userId: user.id
                },
                include: [Submission]
            });
            for (let j = 0; j < votes.length; j++) {
                const vote = votes[j];

                if (vote.userVotedForId == vote.submission.userId) {
                    console.log('got a match!');    
                    results[user.name] += 1;
                }
            }
        }
        
        return results;

    } catch (err) {
        console.error(err);
        return results;
    }
}
module.exports = {
    hasEveryoneSubmitted,
    hasEveryoneVoted,
    calculateWinners,
}
