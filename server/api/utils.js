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
            results[user.name] = {};
            results[user.name]['numCorrect'] = 0;
            results[user.name]['votes'] = [];

            const votes = await Vote.findAll({
                where: {
                    userId: user.id
                },
                include: [{
                    model: Submission
                },
                {
                    model: User,
                    as: 'userVotedFor'
                }]
            });
            for (let j = 0; j < votes.length; j++) {
                const vote = votes[j];

                if (vote.userVotedForId == vote.submission.userId) {
                    results[user.name]['numCorrect'] += 1;
                    results[user.name]['votes'].push({
                        text: vote.submission.text,
                        votedFor: vote.userVotedFor.name,
                        correct: true
                    });
                } else {
                    results[user.name]['votes'].push({
                        text: vote.submission.text,
                        votedFor: vote.userVotedFor.name,
                        correct: false
                    });
                }
            }
        }

        let winners = [];
        const usersSorted = Object.keys(results).sort((a,b) => results[b]['numCorrect']-results[a]['numCorrect'])
        winners.push(usersSorted[0]);
        for (let i = 1; i < usersSorted.length; i++) {
            if (results[usersSorted[i]]['numCorrect'] == results[winners[0]]['numCorrect']) {
                winners.push(usersSorted[i]);
            }
        }

        results['winners'] = winners
        
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
